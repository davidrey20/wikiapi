const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swagger = require("swagger-spec-express");
const articleController = require("../controllers/articleController");

const router = express.Router();
swagger.swaggerize(router);

//Define options for swagger doc

const options = {
  swaggerOptions: {
    url: "http://localhost:3000/api/swagger.json"
  }
};

//define paths
const pathOne = "/articles";
const pathTwo = "/articles/:title";

//Create pathOne routes

router.get(pathOne, articleController.getArticles).describe({
  responses: {
    200: {
      description: "Returns All Articles"
    }
  }
});

router.post(pathOne, articleController.addArticle).describe({
  responses: {
    200: {
      description: "Adds Articles"
    }
  }
});

router.delete(pathOne, articleController.deleteArticles).describe({
  responses: {
    200: {
      description: "Deletes All Articles"
    }
  }
});

//Create pathTwo routes

router.get(pathTwo, articleController.getSingleArticle).describe({
  responses: {
    200: {
      description: "Returns single article"
    }
  }
});

router.put(pathTwo, articleController.replaceSingleArticle).describe({
  responses: {
    200: {
      description: "Replaces single article"
    }
  }
});

router.patch(pathTwo, articleController.patchSingleArticle).describe({
  responses: {
    200: {
      description: "Patches single article"
    }
  }
});

router.delete(pathTwo, articleController.deleteSingleArticle).describe({
  responses: {
    200: {
      description: "Deletes single article"
    }
  }
});

//Route for swagger json

router
  .get("/swagger.json", function(err, res) {
    res.status(200).json(swagger.json());
  })
  .describe({
    responses: {
      200: {
        description: "Returns the swagger.json document"
      }
    }
  });

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(null, options));

module.exports = router;
