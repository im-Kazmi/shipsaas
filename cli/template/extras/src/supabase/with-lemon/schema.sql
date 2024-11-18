/**
* USERS
* Note: This table contains user data. Users should only be able to view and update their own data.
*/
create table users (
  -- UUID from auth.users
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  -- The customer's billing address, stored in JSON format.
  billing_address jsonb,
  -- Stores your customer's payment instruments.
  payment_method jsonb
);
alter table users enable row level security;
create policy "Can view own user data." on users for select using (auth.uid() = id);
create policy "Can update own user data." on users for update using (auth.uid() = id);

/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

/**
* CUSTOMERS
* Note: this is a private table that contains a mapping of user IDs to Stripe customer IDs.
*/
create table customers (
  -- UUID from auth.users
  id uuid references auth.users not null primary key,
  -- The user's customer ID in Lemon Squeezy. User must not be able to update this.
  lemon_squeezy_customer_id text
);
alter table customers enable row level security;
-- No policies as this is a private table that the user must not have access to.

/**
* PLANS
* Note: Plans are created and managed in lemonsqueezy. you can sync via running `bun run lemon:sync-plans`.
*/
create table plans (
  id serial primary key,
  product_id integer not null,
  product_name text,
  variant_id integer not null unique,
  name text not null,
  description text,
  price text not null,
  is_usage_based boolean default false,
  interval text,
  interval_count integer,
  trial_interval text,
  trial_interval_count integer,
  sort integer
);
alter table plans enable row level security;
create policy "Allow public read-only access." on plans for select using (true);

/**
* SUBSCRIPTIONS
* Note: subscriptions are created and managed in Lemon Squeezy and synced to our DB via Lemon Squeezy webhooks.
*/
create type subscription_status as enum ('on_trial', 'active', 'paused', 'past_due', 'unpaid', 'cancelled');
create table subscriptions (
  id serial primary key,
  lemon_squeezy_id text unique not null,
  order_id integer not null,
  user_id uuid references auth.users not null,
  name text not null,
  email text not null,
  status subscription_status not null,
  status_formatted text not null,
  renews_at timestamp with time zone,
  ends_at timestamp with time zone,
  trial_ends_at timestamp with time zone,
  price text not null,
  is_usage_based boolean default false,
  is_paused boolean default false,
  subscription_item_id serial,
  plan_id integer not null references plans(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table subscriptions enable row level security;
create policy "Can only view own subs data." on subscriptions for select using (auth.uid() = user_id);

CREATE TABLE webhookEvent (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    eventName TEXT NOT NULL,
    processed BOOLEAN DEFAULT FALSE,
    body JSONB NOT NULL,
    processingError TEXT
);

alter table webhookEvent enable row level security;

-- Create a policy that denies all access to regular users

create table posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table posts enable row level security;

-- Create policies for the posts table
create policy "Can view all posts."
  on posts for select
  using (true);

create policy "Can insert own posts."
  on posts for insert
  with check (auth.uid() = user_id);

create policy "Can update own posts."
  on posts for update
  using (auth.uid() = user_id);

create policy "Can delete own posts."
  on posts for delete
  using (auth.uid() = user_id);

-- Create a trigger to automatically update the updated_at column
create or replace function update_modified_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_posts_modtime
    before update on posts
    for each row
    execute function update_modified_column();

/**
  * REALTIME SUBSCRIPTIONS
  * Only allow realtime listening on public tables.
  */
 drop publication if exists supabase_realtime;
 create publication supabase_realtime for table plans;
