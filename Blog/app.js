const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash"); // for lowercase the title | is package
const mongoose = require("mongoose");
const multer = require("multer");

// setup multer storage path and file name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // where all files are store
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const homeStartingContent =
  "Welcome to Daily Journal, a blog where I share my thoughts, feelings, and experiences with you. 🙋‍♂️Daily journaling is a powerful habit that can improve your mental health, creativity, and productivity. It can help you reduce stress, cope with anxiety, express yourself, and learn more about yourself. 🧠On this blog, you’ll find posts about my daily life, my hobbies, my travels, what I’m reading, and what I’m learning. You’ll also find tips and tricks on how to start and maintain a daily journaling routine, as well as some inspiration and prompts to get you writing. ✍️";
const aboutContent =
  "Daily Journal is a blog where I share my daily journal entries with you. You’ll find posts about my personal life, my hobbies, my travels, what I’m reading, and what I’m learning. You’ll also find tips and tricks on how to start and maintain a daily journaling routine, as well as some inspiration and prompts to get you writing. ✍️My goal is to create a community of journalers who can support each other, learn from each other, and grow together. I believe that journaling is a powerful tool for self-improvement and happiness, and I hope that this blog can help you achieve that. 😊";
const contactContent =
  "Do you have any questions, suggestions, or feedback for me? I’d love to hear from you and chat with you. 😊You can contact me in any of the following ways: Email me at john@dailyjournal.com and I’ll get back to you as soon as possible. Call me at +1-800-123-4567 and leave a voicemail if I’m not available. Fill out the form below and I’ll reply to you within 24 hours. Please note that my working hours are Monday to Friday, 9 am to 5 pm (EST). I appreciate your patience and understanding. 🙏.";


mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const blogSchema = mongoose.Schema({
  title: String,
  content: String,
  image: {
    filename: String,
    originalName: String,
    mimeType: String,
    size: Number,
    imageUrl: String,
  },
});
const Blog = mongoose.model("Blog", blogSchema);
const blog1 = new Blog({
  title:
    "The rise of sustainable fashion: how ethical choices impact the industry",
  content:
    "In recent years, there has been a growing awareness of the environmental and the social impact of the fashion industry. Consumers are becoming more and more conscious of the clothing they purchase and the practices behind their production. This blog explores the rise of sustainable fashion and how ethical choices can make a significant impact on the industry. We delve into the concept of sustainable fashion, which encompasses various aspects such as eco-friendly materials, fair trade practices, and ethical working conditions. We highlight the efforts of leading fashion brands that have embraced sustainability and share inspiring success stories. Furthermore, the blog discusses the role of consumers in driving the demand for sustainable fashion. We provide practical tips and guidance on how individuals can make conscious choices when shopping for clothing, including supporting ethical brands, opting for secondhand items, and practicing mindful consumption. Join us as we explore the transformative power of sustainable fashion and learn how our choices as consumers can shape the future of the industry.",
});
const blog2 = new Blog({
  title:
    "Unlocking your creative potential: strategies for cultivating creativity",
  content:
    "Creativity is a powerful force that can bring joy, innovation, and personal fulfillment. However, many people struggle to tap into their creative potential. This blog is dedicated to exploring strategies for cultivating creativity and unlocking your imaginative capabilities. We begin by discussing the importance of creativity in various aspects of life, from problem-solving to personal expression. We debunk common myths surrounding creativity and provide insights into the underlying principles that foster a creative mindset. The blog dives into practical techniques and exercises that can enhance your creative thinking. We explore methods such as brainstorming, mind mapping, embracing failure, and seeking inspiration from diverse sources. Additionally, we discuss the benefits of incorporating mindfulness and self-reflection into your creative practice. Whether you're an artist, entrepreneur, or simply seeking to infuse more creativity into your daily life, this blog will equip you with the tools and mindset to unlock your creative potential and embrace a more imaginative existence.",
});
const blog3 = new Blog({
  title: "Navigating the future of remote work: challenges and opportunities",
  content:
    "Remote work has seen an unprecedented surge in recent years, driven by advancements in technology and shifting work culture. However, the transition to remote work is not without its challenges. In this blog, we explore the future of remote work, examining both the obstacles and opportunities it presents.  We begin by analyzing the advantages of remote work, such as increased flexibility, reduced commute time, and improved work-life balance. We delve into the potential challenges that remote workers may encounter, including feelings of isolation, difficulties in collaboration, and maintaining work-life boundaries.  The blog provides practical strategies for overcoming these obstacles and thriving in a remote work environment. We discuss effective communication techniques, building virtual relationships, and establishing a productive home office setup. Additionally, we explore emerging trends in remote work, such as hybrid models and digital nomadism.   Join us as we navigate the future of remote work together, gaining insights and tips to adapt to this evolving landscape and make the most of the opportunities it offers.",
});
const blog4 = new Blog({
  title:
    "The power of mindfulness: harnessing present-moment awareness for well-being",
  content:
    "In a fast-paced and increasingly distracted world, the practice of mindfulness has gained significant attention for its ability to promote well-being and inner peace. This blog explores the power of mindfulness and how harnessing present-moment awareness can transform your life.  We delve into the concept of mindfulness, discussing its roots in ancient meditation practices and its relevance in modern-day living. We explore the science behind mindfulness, highlighting the positive impact it has on mental health, stress reduction, and emotional resilience.  The blog provides practical techniques and exercises to cultivate mindfulness in your daily life. We guide you through mindful breathing exercises, body scans, and meditation practices, allowing you to develop a greater sense of self-awareness and experience the benefits firsthand.  Whether you're new to mindfulness or seeking to deepen your practice, this blog offers valuable insights and guidance to help you incorporate mindfulness into your life and enhance your overall well-being.",
});
const blog5 = new Blog({
  title:
    "Exploring the benefits of outdoor exercise: embrace nature for physical and mental health",
  content:
    "Regular exercise is essential for maintaining a healthy lifestyle, but did you know that taking your workouts outdoors can offer additional benefits? In this blog, we explore the advantages of outdoor exercise and how embracing nature can enhance both your physical and mental well-being.  We discuss the scientific research behind outdoor exercise, highlighting the positive impact it has on cardiovascular health, vitamin D absorption, and overall fitness levels. Furthermore, we delve into the psychological benefits, including reduced stress, improved mood, and enhanced cognitive function.  The blog provides inspiration and practical tips for incorporating outdoor exercise into your routine. We explore various activities such as hiking, cycling, and outdoor yoga, and offer guidance on finding suitable locations and staying safe while enjoying nature.  Join us as we embrace the wonders of outdoor exercise and discover how the combination of physical activity and natural surroundings can create a powerful synergy for optimal health and well-being.",
});
const blogContent = [blog1, blog2, blog3, blog4, blog5];
// add default blog content if not exist
Blog.find().then((all) => {
  {
    all.length === 0 &&
      Blog.insertMany(blogContent).then((db) =>
        console.log("successfully data updated on db")
      );
  }
});

// Route for home page
app.get(["/", "/home"], function (req, res) {
  // [ ] for both "/" and "/home" route
  try {
    Blog.find({}).then((item) => {
      // get the data from the Blog collections and display
      res.render("home", {
        HOMECONTENT: homeStartingContent,
        BLOGCONTENT: item,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error home route");
  }
});

// Route for about page
app.get("/about", function (req, res) {
  res.render("about", { ABOUTCONTENT: aboutContent });
});

// Route for contact page
app.get("/contact", function (req, res) {
  res.render("contact", { CONTACTCONTENT: contactContent });
});

//get method for create post
app.get(["/compose", "/posts/:postName/edit"], async function (req, res) {
  if (req.path === "/compose") {
    const composeType = "submit";
    res.render("compose", {
      PTYPE: "/compose",
      CTYPE: composeType,
      UPDATECONTENTTITLE: " ",
      UPDATECONTENTCONTENT: " ",
    });
  } else {
    //for edit posts
    try {
      const requestID = req.params.postName;
      const oldContent = await Blog.findById(requestID);
      res.render("compose", {
        PTYPE: "/updatePost",
        CTYPE: oldContent.id,
        UPDATECONTENTTITLE: oldContent.title,
        UPDATECONTENTCONTENT: oldContent.content,
        FILETYPE: oldContent.image.imageUrl,
      });
    } catch (err) {
      res.redirect("/");
      console.log(err);
    }
  }
});

//post method the create post
app.post("/compose", upload.single("avatar"), async function (req, res) {
  try {
    const newPost = await new Blog({
      title: _.capitalize(req.body.title),
      content: req.body.postContent,
      image: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        imageUrl: "/uploads/" + req.file.filename,
      },
    });
    newPost.save().then((db) => console.log("uploaded succesfully!"));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while uploading.");
  }
  res.redirect("/");
});


// Post method for update posts
app.post("/updatePost", upload.single("avatar"),  (req, res) => {
  try {
    // check if image or video file is need to change 
    if (req.file) {
        const newImage = {
            filename: req.file.filename,
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
            imageUrl: "/uploads/" + req.file.filename,
          };
          Blog.updateOne(
            { _id: req.body.post },
            {
              title: _.capitalize(req.body.title),
              content: req.body.postContent,
              image:newImage,
            }
          ).then((db) => console.log("updated succesfully!"));
    } else {
      Blog.updateOne(
            { _id: req.body.post },
            {
              title: _.capitalize(req.body.title),
              content: req.body.postContent,
            }
          ).then((db) => console.log("updated succesfully!"));
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while updating.");
  }
  res.redirect("/");
});


//get method for individual posts
app.get("/posts/:postName", function (req, res) {
  let requestID = _.lowerCase(req.params.postName);
  Blog.find().then((allBlog) => {
    allBlog.forEach((item) => {
      let blogID = _.lowerCase(item._id);
      if (blogID === requestID) {
        res.render("post", {
          POSTTITLE: item.title,
          POSTCONTENT: item.content,
          POSTID: item._id,
          IMAGEURL: item.image.imageUrl,
          MEDIATYPE: item.image.mimeType,
        });
      }
    });
  });
});

//for delete and edit the posts
app.post("/posts/edit", function (req, res) {
  let updateContentID = req.body.editContent;
  let deleteContentID = req.body.deleteContent;
  if (deleteContentID) {
    try {
      Blog.deleteOne({ _id: deleteContentID }).then((db) =>
        console.log("deleted successfully!")
      );
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect(`/posts/${updateContentID}/edit`);
  }
  res.redirect("/");
});

//sever hosted at 3000 port
app.listen(3000, function () {
  console.log("Server host at 3000.");
});
