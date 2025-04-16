import { TabProps } from "@/types/blog";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

const SettingsTab: React.FC<TabProps> = ({
    setBlocks,
    selectedBlock,
    setSelectedBlock,
  }) => {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [coverImage, setCoverImage] = useState<File | null>(null);
  
    const updateSettings = () => {
      setBlocks((pv) =>
        pv.map((block) =>
          block.id === selectedBlock?.id
            ? {
                ...block,
                title,
                slug,
                category,
                shortDescription,
                author,
                coverImage,
              }
            : block,
        ),
      );
    };
  
    return (
      <div className="mt-4 overflow-hidden">
        <div className="h-[calc(100vh-12rem)]">
          <div>
            <div>
              <h6>Post Settings</h6>
              <p>Customize the post settings</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <TextField
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <TextField
                  label="Slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <TextField
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <TextField
                  label="Short Description"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  minRows={3}
                  multiline
                />
              </div>
              <div className="space-y-2">
                <TextField
                  label="Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              {/* <div className="space-y-2">
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                />
              </div> */}
              <div className="space-y-2">
                <Button variant="contained" onClick={updateSettings}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };