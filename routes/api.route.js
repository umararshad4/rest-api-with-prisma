const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});
// get all the products route
router.get("/products", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });
    return res.json(products);
  } catch (error) {
    next(error);
  }
});
//get a single product
router.get("/products/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
    return res.json(product);
  } catch (error) {
    next(error);
  }
});
//create product
router.post("/products", async (req, res, next) => {
  const { name, categoryId } = req.body;
  try {
    const createdProduct = await prisma.product.create({
      data: {
        name,
        categoryId,
      },
      include: {
        category: true,
      },
    });
    return res.json(createdProduct);
  } catch (error) {
    next(error);
  }
});

//update product
router.put("/products/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, categoryId } = req.body;
  try {
    const updatedProductAndCategory = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        categoryId,
      },
      include: {
        category: true,
      },
    });
    res.json(updatedProductAndCategory);
  } catch (error) {
    next(error);
  }
});
//delete the product
router.delete("/products/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    });
    res.json(deletedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
