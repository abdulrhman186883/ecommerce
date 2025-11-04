import express from "express"
import { getActiveCartforUser } from "../services/cartService.js";
import validateJWT from "../middlewares/validateJWT.js"
import type {ExtendRequest} from "../types/extendedRequests.js";
import { addItemToCart , updateItemInCart , deleteItemInCart , clearCart} from "../services/cartService.js";

const router = express.Router();


router.get('/', validateJWT, async (req: ExtendRequest, res) => {

const userId = req.user._id;

// user ID from JWT after middleware validation 
const cart = await getActiveCartforUser ({userId})
res.status(200).send(cart);
}
)


router.post('/items', validateJWT, async (req: ExtendRequest , res) => {
 const userId = req?.user?.id;
 const { productId, quantity } = req.body;
 const response = await addItemToCart({ userId, productId, quantity });

res.status(response.statusCode ?? 200).send(response.data);

})


router.put("/items", validateJWT, async (req: ExtendRequest,res) => {
    const userId = req?.user?.id;
    const { productId, quantity } = req.body;
     const response = await updateItemInCart({ userId, productId, quantity });
     res.status(response.statusCode ?? 200).send(response.data);
} )


router.delete("/items/:productId", validateJWT, async (req: ExtendRequest, res) => {
  try {
    
    const userId = req.user.id;
    const { productId } = req.params;

    const response = await deleteItemInCart({ userId, productId });
    if (!response) return res.status(500).send("Internal error");


    return res.status(response.statusCode ?? 200).send(response.data);

  } catch (err) {
    console.error("DELETE error:", err);
   
    return res.status(500).send("Server error");
  }
});



router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
    const userId = req?.user?.id;
    const response = await clearCart({
        userId
    })
    return res.status(response.statusCode ?? 200).send(response.data);
})

export default router;