import { Router } from 'express'
import { Request, Response } from "express";
import { getPosts, createPost, getPost, deletePost, updatePost } from './post.controller';
import { checkSearchParams } from '../../middleware/checks';

export default [
    {
      path: "/api/v1/posts",
      method: "get",
      handler: [
         async (req: Request, res: Response) => {
            getPosts(req,res);
        }
      ]
    },
    {
        path: "/api/v1/posts",
        method: "post",
        handler: [
           async (req: Request, res: Response) => {
            createPost(req,res);  
          }
        ]
      },
      {
        path: "/api/v1/posts/:postId",
        method: "get",
        handler: [
           async (req: Request, res: Response) => {
            getPost(req,res);  
          }
        ]
      },
      {
        path: "/api/v1/posts/:postId",
        method: "delete",
        handler: [
           async (req: Request, res: Response) => {
            deletePost(req,res);  
          }
        ]
      },
      {
        path: "/api/v1/posts/:postId",
        method: "put",
        handler: [
           async (req: Request, res: Response) => {
            updatePost(req,res);  
          }
        ]
      }
  ]
