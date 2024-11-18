import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  updatePostSchema,
} from "./input";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "./service";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      return createPost(ctx, input);
    }),

  getPost: publicProcedure
    .input(getPostSchema)
    .query(async ({ ctx, input }) => {
      return getPost(ctx, input);
    }),

  getPosts: publicProcedure.query(async ({ ctx }) => {
    return getPosts(ctx);
  }),

  deletePost: protectedProcedure
    .input(deletePostSchema)
    .mutation(async ({ ctx, input }) => {
      return deletePost(ctx, input);
    }),
  updatePost: protectedProcedure
    .input(updatePostSchema)
    .mutation(async ({ ctx, input }) => {
      return updatePost(ctx, input);
    }),
});
