module.exports = function(app, db, bcrypt) {
    app.get('/', (req, res) => {
        res.render('home');
    });

    app.get('/login', (req, res) => {
        res.render('login');
    });

    app.post('/login', (req, res) => {
        const { email, password } = req.body;
        const query = 'SELECT * FROM professeurs WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) throw err;
            if (results.length && bcrypt.compareSync(password, results[0].password_hash)) {
                req.session.loggedin = true;
                req.session.user = results[0];
                res.redirect('/dashboard');
            } else {
                res.send('Identifiants incorrects.');
            }
        });
    });

    app.get('/register', (req, res) => {
        res.render('register');
    });

    app.post('/register', (req, res) => {
        const { nom, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const query = 'INSERT INTO professeurs (nom, email, password_hash) VALUES (?, ?, ?)';
        db.query(query, [nom, email, hashedPassword], (err, results) => {
            if (err) throw err;
            res.redirect('/login');
        });
    });

    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });

    app.get('/dashboard', (req, res) => {
        if (!req.session.loggedin) {
            res.redirect('/login');
        } else {
            res.render('dashboard', { user: req.session.user });
        }
    });

    // Route pour ajouter un élève
    app.post('/eleve', (req, res) => {
        if (!req.session.loggedin) {
            return res.redirect('/login');
        }
        const { nom_eleve, classe_eleve } = req.body;
        const query = 'INSERT INTO eleves (nom, classe) VALUES (?, ?)';
        db.query(query, [nom_eleve, classe_eleve], (err, results) => {
            if (err) throw err;
            res.redirect('/dashboard');
        });
    });

    // Route pour ajouter une note
    app.post('/note', (req, res) => {
        if (!req.session.loggedin) {
            return res.redirect('/login');
        }
        const { eleve_id, professeur_id, matiere, note } = req.body;
        const query = 'INSERT INTO notes (eleve_id, professeur_id, matiere, note) VALUES (?, ?, ?, ?)';
        db.query(query, [eleve_id, req.session.user.id, matiere, note], (err, results) => {
            if (err) throw err;
            res.redirect('/dashboard');
        });
    });

    // Route pour voir tous les élèves et leurs notes
    app.get('/donnees', (req, res) => {
        if (!req.session.loggedin) {
            return res.redirect('/login');
        }
        db.query('SELECT eleves.nom AS eleve_nom, eleves.classe, notes.matiere, notes.note FROM eleves JOIN notes ON eleves.id = notes.eleve_id', (err, results) => {
            if (err) throw err;
            res.render('donnees', { eleves: results });
        });
    });
};
