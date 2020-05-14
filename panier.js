//    Affichage du panier

function affichagePanier(){

  let data = localStorage.getItem('panier');
  data = JSON.parse(data);


  var total = localStorage.getItem('prixTotal');
  var prixTotal = document.getElementById('total');

// affichage du prix total du panier
  if (total != null) {
    prixTotal.textContent = 'Le montant de votre commande est de : ' + total +  ' €';
    prixTotal.id = 'prixTotal'; 
  } else {
    prixTotal.textContent = 'Le montant de votre commande est de : 0 €';
  }

// affichage des produits au panier sous forme de petites fiches articles
  let productContainer = document.getElementById("basket");

  if( data == null || total == 0 ) {
    var div = document.createElement('div');
    div.textContent = " Votre panier est vide ";
    basket.appendChild(div);
  } else {
    productContainer.innerHTML = '';
    Object.values(data).map( (teddy) => {
    
      var article = document.createElement('article');
                    
      var image = document.createElement('img');
      image.src =  teddy.img;
              
      var div = document.createElement('div');
      var nom = document.createElement('p');
      nom.textContent = teddy.nom;
      var prix = document.createElement('p');
      prix.textContent = 'Prix: ' + teddy.prix + ' €';  
      var supprime = document.createElement('button');
      supprime.textContent = "supprimer l'article";
      supprime.id = "supprime";
               
      // mise en place des éléments 
    
      basket.appendChild(article);
                              
      article.appendChild(image);
      article.appendChild(div);
                    
      div.appendChild(nom);
      div.appendChild(prix);
      div.appendChild(supprime);

    }); 
  }; 
deleteButtons();
};
affichagePanier();

//  Suppression d'un article
function deleteButtons() {
  let deleteButtons = document.querySelectorAll('#basket #supprime');
  let nomProduit;
  let prixTotal = localStorage.getItem("prixTotal");
  let article = localStorage.getItem('panier');
  article = JSON.parse(article);

  for(let i=0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', () => {
      nomProduit = deleteButtons[i].parentElement.firstChild.textContent;
    
      localStorage.setItem('prixTotal', prixTotal - (article[nomProduit].prix));

      delete article[nomProduit];
      alert('Vous avez supprimé '+ nomProduit + ' de votre panier ! ')
      localStorage.setItem('panier', JSON.stringify(article));
      window.location.reload();
      affichagePanier();
    });
  };
};


//  requete finale de commande contenant les informations de contact et les Id produit
function achat() {

// integration d'une alerte si le panier est vide, on ne peut pas passer commande  
  let panier = localStorage.getItem('panier');
  panier = JSON.parse(panier);
  var total = localStorage.getItem('prixTotal');
if (panier == null || total == 0){
  alert("Votre panier est vide, vous ne pouvez pas passer une commande ! ")
 }  

 let products = [];

  function productId() {
    let panier = JSON.parse(localStorage.getItem('panier'));

         idProduct = Object.values(panier).map( (teddy) => {
          products.push(teddy.id);
          console.log(products); return products;
        });
    };
    productId();
    // Récupérer la valeur des champs
     
    let firstName = document.getElementById('firstname').value;
    let lastName = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;

  // Mettre les valeurs dans un objet
  
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
  console.log(achat);
  console.log(products);
  
  //afficher une alerte si il manque un renseignement et enregistrer les données dans le localStorage

if(firstName == ""){
    alert('Vous devez compléter votre prenom !');
    return true;
}
if(lastName == ""){
    alert('Vous devez compléter votre nom !');
    return true;
}
if(email == ""){
    alert('Vous devez compléter votre e-mail !');
    return true;
  }
if(address == ""){
    alert('Vous devez compléter votre adresse !');
    return true;
}
if(city == ""){
    alert('Vous devez compléter votre ville !');
    return true;
}
if (panier == null || total == 0){
  return true;
}else{
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
  


