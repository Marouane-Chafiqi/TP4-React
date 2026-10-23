import { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [taches, setTaches] = useState(() => {
    try {
      const sauvegarde = localStorage.getItem('taches');
      return sauvegarde ? JSON.parse(sauvegarde) : [];
    } catch (erreur) {
      return [];
    }
  });
  const [filtre, setFiltre] = useState('toutes');

  useEffect(() => {
    localStorage.setItem('taches', JSON.stringify(taches));
  }, [taches]);

  const ajouterTache = (texte) => {
    const nouvelleTache = { id: Date.now(), texte, terminee: false };
    setTaches([...taches, nouvelleTache]);
  };

  const changerEtat = (id) => {
    setTaches(
      taches.map((t) => (t.id === id ? { ...t, terminee: !t.terminee } : t))
    );
  };

  const supprimerTache = (id) => {
    setTaches(taches.filter((t) => t.id !== id));
  };

  const tachesAffichees = taches.filter((t) => {
    if (filtre === 'terminees') return t.terminee;
    if (filtre === 'en-cours') return !t.terminee;
    return true;
  });

  const restantes = taches.filter((t) => !t.terminee).length;

  return (
    <div className="App">
      <h1>Ma To-Do List Interactive</h1>
      <TodoForm ajouterTache={ajouterTache} />

      <div className="filtres">
        <button
          className={filtre === 'toutes' ? 'actif' : ''}
          onClick={() => setFiltre('toutes')}
        >
          Toutes
        </button>
        <button
          className={filtre === 'en-cours' ? 'actif' : ''}
          onClick={() => setFiltre('en-cours')}
        >
          En cours
        </button>
        <button
          className={filtre === 'terminees' ? 'actif' : ''}
          onClick={() => setFiltre('terminees')}
        >
          Terminées
        </button>
      </div>

      <TodoList
        taches={tachesAffichees}
        changerEtat={changerEtat}
        supprimerTache={supprimerTache}
      />

      <p className="compteur">
        {restantes} tâche(s) restante(s) sur {taches.length}
      </p>
    </div>
  );
}

export default App;
