import { CreateBlogDialog } from "../create-blog-dialog";

export default function CreateBlogDialogExample() {
  return (
    <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      <CreateBlogDialog
        onCreateBlog={(topic) => console.log("Creating blog with topic:", topic)}
      />
    </div>
  );
}
