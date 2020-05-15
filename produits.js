//  récupération de l'id produit dans l'url

let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log(id);

let _id = id;
let teddy;
let paniers;

//  obtention d'un seul produit à afficher dans la page produit
let article = () => {
  let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            teddy = JSON.parse(this.responseText);
            affichageProduit();
        }
    };
    request.open("GET", "http://localhost:3000/api/teddies/" + _id);
    request.send();
};
// on affiche l'article demandé à l'ouverture de la page produit
window.addEventListener('load', article);

let panier = localStorage.getItem('panier');
panier = JSON.parse(panier);
localStorage.setItem('panier', JSON.stringify(panier));

 // Affichage du produit sous forme de petit container
function affichageProduit() {
    
    var article = document.createElement('article');
        var image = document.createElement('img');
        image.src =  teddy.imageUrl;
    
        id =  teddy._id;
        
    var div = document.createElement('div');
        var nom = document.createElement('h3');
        nom.textContent = teddy.name;
        nom.id = "nom";
    
        var prix = document.createElement('h4');
        prix.textContent = 'Prix :';
        var price = document.createElement('p');
        price.textContent = teddy.price/100 + ' €';
    
        var desc = document.createElement('h4');
        desc.textContent = 'Description :';
        var description = document.createElement('p');
        description.textContent = teddy.description;

        // bouton retour à la liste de produit (index.html)
    var liste = document.createElement('button');
    liste.id = "liste";
    liste.textContent = "Retour à la liste";
    liste.addEventListener('click', function() {
        window.location.href = "index.html";
    });
        // bouton voir le panier (panier.html)
    var voirPanier = document.createElement('button');
    voirPanier.id = "voirPanier";
    voirPanier.textContent = "Voir mon panier";
    voirPanier.addEventListener('click', function(e) {
        window.location.href = "panier.html";
    });

    //  choix de la couleur
    var label = document.createElement('label');
    label.textContent = "Couleur : ";
    var color = document.createElement('select');
    color.id = 'choix';
    var choix = teddy.colors;
    choix.id = "couleur";

    // création d'une boucle For pour afficher la liste déroulante des couleurs du Teddy
    for (var i = 0; i < choix.length; i++) {
    var option = document.createElement('option');
    option.textContent = choix[i];
    option.id = "couleur";
    color.appendChild(option);
    };

    // bouton Ajout au panier
    ajoutPanier = document.createElement ('button');
    ajoutPanier.id = "stockage";
    ajoutPanier.textContent = "Ajouter au panier";

    ajoutPanier.addEventListener('click', function() {
        if(typeof localStorage!='undefined' && JSON) {
            let paniers = {
                img:teddy.imageUrl,
                id:teddy._id,
                nom:document.getElementById('nom').textContent,
                prix: teddy.price/100,
                quantite:1
            };
                
            console.log(paniers);    
            quantite = 1;      
            let prix = teddy.price/100;
            
            setItems();

 // envoi au panier et calcul du prix total
            function setItems(){
                let panier = localStorage.getItem('panier');
                panier = JSON.parse(panier);
                let article = paniers.nom;
                let prixTotal = localStorage.getItem('prixTotal');
                prixTotal = parseInt(prixTotal);
                prix = parseInt(prix);
                if (panier != null) {
                    if(panier[article] == undefined) {
                        panier = {
                            ...panier,
                            [article]:paniers
                        };
                    localStorage.setItem('prixTotal', prixTotal + prix);
                    alert('Article ajouté au panier');
                    } else {
                    alert('Article déjà ajouté au panier');
                    };           
                } else {
                    panier = {
                        [article]:paniers
                        };
                    localStorage.setItem('prixTotal', prix );
                    alert('Article ajouté au panier');
                };
            localStorage.setItem('panier', JSON.stringify(panier));
            };

        } else {
            alert("localStorage n'est pas supporté");
        };
    });

    // mise en place des éléments dans le DOM
 
    produit.appendChild(article);
    article.appendChild(nom);
    article.appendChild(image);
    article.appendChild(div);
    div.appendChild(prix);
    div.appendChild(price);
    div.appendChild(desc);
    div.appendChild(description);
    div.appendChild(label);
    div.appendChild(color);
    div.appendChild(ajoutPanier)
    div.appendChild(liste);
    div.appendChild(voirPanier);

};