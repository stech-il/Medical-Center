import express from 'express'
// import { createBlog, deleteBlog, getAllBlogs, getBlog, updateBlog } from '../controllers/BlogController.js'
import { getAllRooms } from '../controllers/RoomController.js'

const router = express.Router()

router.get('/', getAllRooms)
// router.get('/:id', getBlog)
// router.post('/', createBlog)
// router.put('/:id', updateBlog)
// router.delete('/:id', deleteBlog)

export default router