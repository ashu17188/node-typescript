import { Request, Response } from 'express'

// DB
import { connect } from '../../database'
// Interfaces
import { Post } from './post';
import { format } from 'mysql2/promise';

export class PostService{
    constructor(){}

    async getPosts(req: Request, res: Response) {
        try {
            const conn = await connect();
            const posts = await conn.query('SELECT * FROM posts');
            return res.json(posts[0]);
        }
        catch (e) {
            console.log(e)
        }
    }
    
    async createPost(req: Request, res: Response) {
        const newPost: Post = req.body;
        const conn = await connect();
        console.log( JSON.stringify(req.body));
        const sql = format('INSERT INTO posts SET ?', [newPost]);
        
        console.log(sql);
        let postQuery = await conn.query(sql).then(data=>{
            console.log(data);
        }
           
        ).catch(err=>{ 
            throw err;
        });
        res.json({
            message: 'New Post Created'
        });
    }
    

    
    async getPostById(req: Request, res: Response) {
        const id = req.params.postId;
        console.log(req.params);
        const conn = await connect();
        const sql = format('SELECT * FROM posts WHERE id = ?', [id]);
        console.log(sql);
        const posts = await conn.query(sql);
        res.json(posts[0]);
    }
    
    async deletePost(req: Request, res: Response) {
        const id = req.params.postId;
        const conn = await connect();
        await conn.query('DELETE FROM posts WHERE id = ?', [id]);
        res.json({
            message: 'Post deleted'
        });
    }
    
    async updatePost(req: Request, res: Response) {
        const updatePost: Post = req.body;
        const id = updatePost.id;
        const conn = await connect();
        const sql = format('UPDATE posts set ? WHERE id = ?', [updatePost, id]);
        console.log(`Update sql : ${sql}`);
        await conn.query(sql);
        res.json({
            message: 'Post Updated'
        });
    }
}
// export async function getPosts(req: Request, res: Response): Promise<Response | void> {
//     try {
//         const conn = await connect();
//         const posts = await conn.query('SELECT * FROM posts');
//         return res.json(posts[0]);
//     }
//     catch (e) {
//         console.log(e)
//     }
// }

// export async function createPost(req: Request, res: Response) {
//     const newPost: Post = req.body;
//     const conn = await connect();
//     console.log(`Req obj : ${[newPost]}`);
//     await conn.query('INSERT INTO posts SET ?', [newPost]);
//     res.json({
//         message: 'New Post Created'
//     });
// }

// export async function getPost(req: Request, res: Response) {
//     const id = req.params.postId;
//     const conn = await connect();
//     const posts = await conn.query('SELECT * FROM posts WHERE id = ?', [id]);
//     res.json(posts[0]);
// }

// export async function deletePost(req: Request, res: Response) {
//     const id = req.params.postId;
//     const conn = await connect();
//     await conn.query('DELETE FROM posts WHERE id = ?', [id]);
//     res.json({
//         message: 'Post deleted'
//     });
// }

// export async function updatePost(req: Request, res: Response) {
//     const id = req.params.postId;
//     const updatePost: Post = req.body;
//     const conn = await connect();
//     await conn.query('UPDATE posts set ? WHERE id = ?', [updatePost, id]);
//     res.json({
//         message: 'Post Updated'
//     });
// }