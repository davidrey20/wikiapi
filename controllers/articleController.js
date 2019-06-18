// External Dependancies
const boom = require("boom");

// Get Data Models
const Article = require("../models/article");

// Get all articles

exports.getArticles = async (req, reply) => {
  try {
    const article = await Article.find();
    reply.send(article);
  } catch (error) {
    throw boom.boomify(error);
  }
};

// Add a new article

exports.addArticle = async (req, reply) => {
  try {
    const article = await new Article(req.body);
    article.save();
    reply.send(req.body);
  } catch (error) {
    throw boom.boomify(error);
  }
};

// Delete all articles

exports.deleteArticles = async (req, reply) => {
  try {
    const article = await Article.deleteMany();
    reply.send("All Articles Deleted");
  } catch (error) {
    throw boom.boomify(error);
  }
};

//API VERBS Implemented for /<specific article>

// Get single article

exports.getSingleArticle = async (req, reply) => {
  try {
    const article = await Article.find({ title: req.params.title });
    reply.send(article);
  } catch (error) {
    throw boom.boomify(error);
  }
};

// Replace one article

exports.replaceSingleArticle = async (req, reply) => {
  try {
    const article = await Article.replaceOne(
      // Conditions
      { title: req.params.title },
      // Replace
      req.body
    );
    if (article.nModified === 0) {
      reply.send("No articles replaced");
    } else {
      reply.send("Article replaced");
    }
  } catch (error) {
    throw boom.boomify(error);
  }
};

// Patch an article

exports.patchSingleArticle = async (req, reply) => {
  try {
    const article = await Article.findOneAndUpdate(
      // Conditions
      { title: req.params.title },
      // Update
      req.body,
      // Options
      { new: true }
    );
    reply.send(article);
  } catch (error) {
    throw boom.boomify(error);
  }
};

// Delete single article

exports.deleteSingleArticle = async (req, reply) => {
  try {
    const article = await Article.findOneAndDelete(
      //Conditions
      { title: req.params.title }
      //Options
      //Callback
    );
    reply.send("Article deleted");
  } catch (error) {
    throw boom.boomify(error);
  }
};
