import cron from "node-cron";
import Blog from "../models/Blog.js";


export function startBlogScheduler() {
  console.log("🕒 Blog scheduler initialized...");

  // Run every minute
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      // Find blogs that are scheduled and due
      const blogs = await Blog.find({
        status: "scheduled",
        scheduledFor: { $lte: now },
      });

      if (blogs.length > 0) {
        console.log(`📌 Found ${blogs.length} blogs to publish...`);

        // Update them to "published"
        for (const blog of blogs) {
          blog.status = "published";
          blog.scheduledFor = null;
          await blog.save();
          console.log(`✅ Blog "${blog.title}" published`);
        }
      }
    } catch (error) {
      console.error("❌ Error in blog scheduler:", error.message);
    }
  });
}
