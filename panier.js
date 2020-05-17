//Mise a jour du nombre de produit dans l'onglet panier
function chargementPanier(){
  let nombreProduit = localStorage.getItem('qté'); 
  
  if(nombreProduit){
  document.querySelector ('.totalQté').textContent = nombreProduit;
  }else{
      document.querySelector ('.totalQté').textContent = 0 ;
  }
}

chargementPanier(); 

//    Affichage des articles mis au panier dans la page panier
function affichagePanier(){

  let data = localStorage.getItem('panier');
  data = JSON.parse(data);

//on enregistre les valeurs du prix total dans une variable
  var total = localStorage.getItem('prixTotal');
  var prixPanier = document.getElementById('total');

// affichage du prix total du panier si le panier contient quelque chose...Sinon on affiche "votre panier est vide"
  if (total != null) {
    prixPanier.textContent = 'Le montant de votre commande est de : ' + total +  ' €';
    prixPanier.id = 'prixTotal'; 
  } else  {
    prixPanier.textContent = 'Le montant de votre commande est de : 0 €';
  }

// affichage des produits au panier sous forme de petites fiches articles
  let productContainer = document.getElementById("basket");

  if( data == null || total == 0 ) {
    var div = document.createElement('div');
    div.textContent = " Votre panier est vide ";
    basket.appendChild(div);
  } else {
    productContainer.innerHTML = '';
    //on récupere les valeurs dans le localStorage pour les afficher sous forme de petit container pour le panier
    Object.values(data).map( (teddy) => {
    
      var article = document.createElement('article');
      article.id = "articlePanier";
      var nom = document.createElement('h2');
      nom.textContent = teddy.name;
      var image = document.createElement('img');
      image.src =  teddy.imageUrl;
      var div = document.createElement('div');
      div.id = "produit";
      var quantite = document.createElement('h3');
      quantite.textContent = 'Quantité: ';
      var qté = document.createElement('p');
      qté.textContent =  teddy.qté;
      var prix = document.createElement('h3');
      prix.textContent = 'Prix: '; 
      var price = document.createElement('p');
      price.textContent = teddy.price;
      price.id = "price";  
      var supprime = document.createElement('button');
      supprime.textContent = "supprimer l'article";
      supprime.id = "supprime";
               
      // mise en place des éléments dans le DOM
    
      basket.appendChild(article);  
      article.appendChild(nom);                   
      article.appendChild(image);
      article.appendChild(div);         
      div.appendChild(quantite);
      div.appendChild(qté);
      div.appendChild(prix);
      div.appendChild(price);
      div.appendChild(supprime);
    }); 
  }; 
  // on appelle la fonction "supprimer le produit" dans le container de l'article au panier
deleteButtons();
};
// on appelle la fonction "affichage panier" pour afficher les produits au panier 
affichagePanier();

//  Suppression d'un article
function deleteButtons() {  
  let deleteButtons = document.querySelectorAll('#supprime');
  let nomProduit ;
  let nombreTotalDeProduit = localStorage.getItem('qté');
  nombreTotalDeProduit = parseInt(nombreTotalDeProduit);
  let coutDuPanier = localStorage.getItem("prixTotal");
  coutDuPanier = parseInt(coutDuPanier);
  let data = JSON.parse(localStorage.getItem('panier'));

// on fait une boucle For pour afficher les boutons "supprimer produits" autant de fois qu'il y a un article au panier
  
for(let i=0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', () => {
      // récupération du nom du teddy pour plus tard
      nomProduit = deleteButtons[i].parentElement.parentElement.firstChild.innerText.trim();
      console.log(nomProduit);
      // récupération du qté du teddy pour calculs de la suppression
      qté = deleteButtons[i].parentElement.children[1].textContent;
      //conversion du string en number
      qté = parseInt(qté);
      // récupération du prix du teddy pour calculs de la suppression
      let price = deleteButtons[i].parentElement.children[3].textContent;
       //conversion du string en number
      price = parseInt(price);
      //calcul de la qté dans le panier après suppression de l'article
      calculQte = nombreTotalDeProduit - qté;
      localStorage.setItem('qté', calculQte);
      //calcul du prix dans le panier après suppression de l'article
      calculPrice = coutDuPanier - qté * price;
      localStorage.setItem('prixTotal', calculPrice);
      // on supprime la ligne du teddy correspondant au bouton supprimer
      delete data[nomProduit];

      // une petite alerte pour dire qu'un article à été supprimé.
      alert('Vous avez supprimé '+ nomProduit + ' de votre panier ! ')
      // on actualise le LocalStorage et recharge la page pour une mise a jour
      localStorage.setItem('panier', JSON.stringify(data));
      window.location.reload();
    
      affichagePanier();
      chargementPanier(); 
     });
    }; 
};

//  requete finale de commande contenant les informations de contact et les Id produit
var formValid = document.getElementById('valider');
formValid.addEventListener ('click', achat);

function achat() {

// integration d'une alerte si le panier est vide, on ne peut pas passer commande  
  let panier = localStorage.getItem('panier');
  panier = JSON.parse(panier);
  var total = localStorage.getItem('prixTotal');
if (panier == null || total == 0){
  alert("Votre panier est vide, vous ne pouvez pas passer une commande ! ")
 }  
// on déclare un tableau de produits pour la requete POST plus tard
 let products = [];

 // on fait une fonction pour récupérer les id des produits au panier, pour l'afficher dans la requete POST
  function productId() {
    let panier = JSON.parse(localStorage.getItem('panier'));

         idProduct = Object.values(panier).map( (teddy) => {
          products.push(teddy._id);
          console.log(products); return products;
        });
    };
    productId();
    // Récupérer la valeur des champs saisis par le client
     
    let firstName = document.getElementById('firstname').value;
    let lastName = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;

  // on met les valeurs dans un objet pour la requete POST
  
    let contact = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "address": address,
        "city": city,
    };

// création de l'objet obligatoire pour la requete à envoyer au serveur
  let objt = {
    contact,
    products
  };

  let achat = JSON.stringify(objt);
 // console.log(achat);
 // console.log(products);
  
  //afficher une alerte si il manque un renseignement et enregistrer les données dans le localStorage
  var prenom = document.getElementById('firstname');
  var oublisPrenom = document.getElementById('oublisPrenom');
  var prenomValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

  var nom = document.getElementById('name');
  var oublisNom = document.getElementById('oublisNom');
  var nomValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

  var mail = document.getElementById('email');
  var oublisEmail = document.getElementById('oublisEmail');
  var mailValid = /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/;

  var adresse = document.getElementById('address');
  var oublisAdress = document.getElementById('oublisAdress');
  var adresseValid = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*/;

  var ville = document.getElementById('city');
  var oublisVille = document.getElementById('oublisVille');
  var villeValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

  if (prenomValid.test(prenom.value) == false){
    oublisPrenom.textContent = "Format de votre prénom incorrect";
    oublisPrenom.style.color = 'red';
    return event.preventDefault();

  } else if (nomValid.test(nom.value) == false){
    oublisNom.textContent = "Format de votre nom incorrect";
    oublisNom.style.color = 'red';
    return event.preventDefault();

  } else if (mailValid.test(mail.value) == false){
    oublisEmail.textContent = "Format de votre e-mail incorrect";
    oublisEmail.style.color = 'red';
    return event.preventDefault();

  } else if (adresseValid.test(adresse.value) == false){
    oublisAdress.textContent = "Format de votre adresse incorrect";
    oublisAdress.style.color = 'red';
    return event.preventDefault();

  } else if (villeValid.test(ville.value) == false){
    oublisVille.textContent = "Format de votre ville incorrect";
    oublisVille.style.color = 'red';
    return event.preventDefault();

  } else if (panier == null || total == 0){
    return event.preventDefault();
 
  } else {
  // si tout à été bien rempli, on envoi la commande au serveur, avec toutes les coordonnées du client
  let request = new XMLHttpRequest();
       request.onreadystatechange = function () {
         if (this.readyState == XMLHttpRequest.DONE) {
           let confirmation = JSON.parse(this.responseText);
           sessionStorage.setItem('order', JSON.stringify(confirmation));
           let prix = localStorage.getItem('prixTotal');
           prix = JSON.parse(prix);
           sessionStorage.setItem('prix', JSON.stringify(prix));
           window.location.href = "commande.html";
           localStorage.clear();
         }
       };
  request.open("post", "http://localhost:3000/api/teddies/order");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(achat);
} 

}



