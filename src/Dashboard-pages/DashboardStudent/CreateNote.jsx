import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxiosSecure from "./../../Hook/useAxiosSecure";
import useAuth from "./../../Hook/UseAuth";
import { toast } from "react-hot-toast"; // Import react-hot-toast

const CreateNote = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [content, setContent] = useState(""); // State to hold the content

  const handleSaveNote = async (e) => {
    e.preventDefault();

    // Access form elements
    const form = e.target;
    const title = form.title.value;

    // Convert HTML content to plain text
    const plainTextContent = new DOMParser().parseFromString(content, "text/html").body.innerText;

    // Check if the title and content are not empty
    if (title && plainTextContent) {
      const newNote = {
        title,
        content: plainTextContent, // Save plain text content
        id: Date.now(),
        user: user?.email,
      };

      try {
        const response = await axiosSecure.post("/create-note", newNote);
        console.log("Response:", response);

        // Show success notification
        toast.success("Note saved successfully!");

        // Clear form fields after successful submission
        form.reset(); // Reset the form fields
        setContent(""); // Clear the ReactQuill content
      } catch (error) {
        console.error("Error saving note:", error.response || error);

        // Show error notification
        toast.error("Failed to save the note.");
      }
    } else {
      // Show a warning if title or content is empty
      toast.error("Title and content cannot be empty.");
    }
  };

  const handleContentChange = (value) => {
    setContent(value); // Update state with the new content
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg border">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Create a Note
      </h2>

      <form onSubmit={handleSaveNote}>
        <input
          type="text"
          name="title" // Use name attribute to access this value in handleSaveNote
          className="w-full p-3 mb-6 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Note Title"
        />

        <div className="mb-12">
          <ReactQuill
            value={content} // Bind the value to the state
            onChange={handleContentChange} // Update state on content change
            modules={modules}
            placeholder="Write something awesome..."
            className="h-[350px]" // This sets the height to 24rem (384px) using Tailwind
          />
        </div>

        <div className="flex justify-end mt-3">
          <button
            type="submit" // Change to type="submit" for form submission
            className="bg-purple-600 text-white px-6 py-3 text-lg rounded-md hover:bg-purple-700 transition duration-300"
          >
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
