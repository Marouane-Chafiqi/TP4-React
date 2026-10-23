function TodoItem({ tache, changerEtat, supprimerTache }) {
  return (
    <li className={tache.terminee ? 'todo-item terminee' : 'todo-item'}>
      <label>
        <input
          type="checkbox"
          checked={tache.terminee}
          onChange={() => changerEtat(tache.id)}
        />
        <span>{tache.texte}</span>
      </label>
      <button className="btn-supprimer" onClick={() => supprimerTache(tache.id)}>
        Supprimer
      </button>
    </li>
  );
}

export default TodoItem;
