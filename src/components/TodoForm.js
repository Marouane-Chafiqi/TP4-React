import { useState } from 'react';

function TodoForm({ ajouterTache }) {
  const [texte, setTexte] = useState('');

  const soumettreFormulaire = (e) => {
    e.preventDefault();
    if (!texte.trim()) return;
    ajouterTache(texte.trim());
    setTexte('');
  };

  return (
    <form className="todo-form" onSubmit={soumettreFormulaire}>
      <input
        type="text"
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        placeholder="Ajouter une nouvelle tâche..."
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default TodoForm;
