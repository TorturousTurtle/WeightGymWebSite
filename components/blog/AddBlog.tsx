import { AddBlogProps } from "@/interfaces/add-blog-interface";

const AddBlog: React.FC<AddBlogProps> = (props) => {
    return (
        <>
        <form
          className="bg-gray-200 p-6 mt-6 rounded-lg md:w-[90%] lg:w-1/2"
          onSubmit={props.handleSubmit}
        >
        <div className="w-full  mb-4">
            <label htmlFor="f-title" className="text-gray-700">
              Blog Title:
            </label>
            <input
              id="f-title"
              type="text"
              name="title"
              ref={props.titleTextInputRef}
              required
              className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-wg-green focus:border-wg-green text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="text-gray-700">
              Blog Body:
            </label>
            <textarea
              id="message"
              name="message"
              rows={20}
              ref={props.messageTextInputRef}
              required
              className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-wg-green focus:border-wg-green text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="text-gray-700">
              Upload Image (optional):
            </label>
            <input
              id="image"
              type="file"
              name="image"
              ref={props.imageInputRef}
              accept="image/*"
              className="block w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-wg-green focus:border-wg-green text-gray-900"
            />
          </div>
          <div className="flex text-center justify-end w-full">
            <button
              type="submit"
              className="bg-wg-green text-white py-2 px-4 mr-5 rounded-lg hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-wg-green"
            >
              Submit
            </button>
          </div>
          <p className="text-gray-700">*All fields are required</p></form></>
    )
}

export default AddBlog;