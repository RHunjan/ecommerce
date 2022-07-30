const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll()
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});


// Find category by ID

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

 
//create new category
router.post('/', (req, res) => {
  // expects {category_name: 'Balloons'}
  Category.create({
    category_name: req.body.category_name,
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.put('/:id', (req, res) => {
//   // update a category by its `id` value
// });

router.put("/:id", (req, res) => {
  // expects {category_name: 'Deli}
  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData[0]) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
 
 // delete a category by its `id` value
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "No category with this id" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
