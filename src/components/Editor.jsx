import "../styles/editor.css";

function Editor({ setIsEditorOpen }) {
  return (
    <section className="editor-container">
      <div className="input-contents">
        <input className="text-field" placeholder="Read book daily at 8p.m." />
        <input className="description" placeholder="Description"></input>
        <div className="date-selector onhover">
          <span className="material-icons-outlined">event</span>
          <span>Date</span>
        </div>
      </div>

      <div className="editor-actions">
        <div className="editor-task-category onhover">
          <span className="material-icons-outlined">inbox</span>
          <span>Inbox</span>
          <span className="material-icons-outlined">arrow_drop_down</span>
        </div>

        <div className="action-buttons">
          <button className="cancel" onClick={() => setIsEditorOpen(false)}>
            Cancel
          </button>
          <button className="save">Add task</button>
        </div>
      </div>
    </section>
  );
}

export default Editor;
