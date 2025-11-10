const mongoose = require("mongoose");
require("dotenv").config();
const ProjectEn = require("../models/ProjectEn");
const ProjectSi = require("../models/ProjectSi");
const ProjectTa = require("../models/ProjectTa");

const migrateImageUrls = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const models = [
      { name: "ProjectEn", model: ProjectEn },
      { name: "ProjectSi", model: ProjectSi },
      { name: "ProjectTa", model: ProjectTa },
    ];

    for (const { name, model } of models) {
      const projects = await model.find({});
      console.log(`\nProcessing ${name}: ${projects.length} projects`);

      let updated = 0;
      for (const project of projects) {
        const oldUrl = project.imageUrl;

        // Extract filename from various URL formats
        let newUrl = oldUrl;

        // Check if it's already a relative path
        if (oldUrl.startsWith("/uploads/")) {
          console.log(`  ✓ Already relative: ${oldUrl}`);
          continue;
        }

        // Extract from full URL (e.g., http://localhost:5000/uploads/file.jpg)
        const match = oldUrl.match(/\/uploads\/(.+)$/);
        if (match) {
          newUrl = `/uploads/${match[1]}`;
        } else if (oldUrl.includes("/uploads/")) {
          // Handle edge cases
          const parts = oldUrl.split("/uploads/");
          if (parts.length > 1) {
            newUrl = `/uploads/${parts[parts.length - 1]}`;
          }
        } else {
          console.log(`  ⚠️ Cannot parse URL: ${oldUrl}`);
          continue;
        }

        if (newUrl !== oldUrl) {
          project.imageUrl = newUrl;
          await project.save();
          updated++;
          console.log(`  ✓ Updated: ${oldUrl} → ${newUrl}`);
        }
      }

      console.log(`${name}: Updated ${updated} records`);
    }

    console.log("\n✅ Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
};

migrateImageUrls();
