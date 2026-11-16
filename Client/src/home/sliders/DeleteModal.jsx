import "../../assets/css/shopAdmin.module.css";


export default function DeleteModal({ title = "Are you sure?", onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-xl w-96 text-center">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="flex justify-center gap-4">
          <button onClick={onConfirm} className="btn-danger">Yes, Delete</button>
          <button onClick={onCancel} className="btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
}