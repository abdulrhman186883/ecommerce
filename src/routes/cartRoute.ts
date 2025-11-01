import express from "express"
import { getActiveCartforUser } from "../services/cartService.js";
import validateJWT from "../middlewares/validateJWT.js"
import type { ExtendRequest } from "../middlewares/validateJWT.js";

const router = express.Router();


router.get('/', validateJWT, async (req: ExtendRequest, res) => {

const userId = req.user._id;

// user ID from JWT after middleware validation 
const cart = await getActiveCartforUser ({userId})
res.status(200).send(cart);
}
)


export default router;