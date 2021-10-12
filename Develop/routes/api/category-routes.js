const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll( {
      include:
    {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });
      console.log(categoryData);  
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include:
    {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });
      if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    const category = categoryData.get({ plain: true });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/", (req, res) => {
  category.create({
    category_name: req.body.category_name
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});
  

  router.put('/:id', async (req, res) => {
    try {
      const categoryID = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
        individualHooks: true
      });
      if (!categoryID[0]) {
        res.status(404).json({ message: 'No category with this id!' });
        return;
      }
      res.status(200).json(categoryID);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.delete('/:id', (req, res) => {
    // deleting a category by its `id` value
    Category.destroy({
      where: {
          id: req.params.id
      }
    })
      .then(categoryData => {
          if (!categoryData) {
              res.status(404).json({ message: 'No category found with this id'});
              return;
          }
          res.json(categoryData);
    })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
    });
  });

module.exports = router;
