// Affichage du numéro de commande avec message de remerciement

function commande(){

    let data = JSON.parse(sessionStorage.getItem('order'));
    let prix = JSON.parse(sessionStorage.getItem('prix'));

    let productContainer = document.getElementById("recap");

    // Création du message de confirmation de commande

    if( data != null ) {
        productContainer.innerHTML = '';
        // on récupere les données dans l'objet order de la commande dans le LocalStorage
        Object.values(data).map( () => {

            //et on affiche le message de confirmation avec les données récupérées
            productContainer.innerHTML = 
            `<p>Merci pour votre commande.</p>

            <p>Celle-ci a été enregistrée sous le numéro : <span class="gras"> ${data.orderId}</span>,
            pour un montant total de <span class="gras">${prix} €</span>.
            </p>
                
            <p>Toute l'équipe d'Orinoco vous remercie pour votre achat.<br><br>
            
            <i class="fas fa-paw"></i> <i class="fas fa-paw"></i> <span class="abientot"> A BIENTÔT </span> <i class="fas fa-paw"></i> <i class="fas fa-paw"></i></p>`   
        });    
    } 
}
// remise à zero du sessionStorage grace au bouton "retour a l'accueil du site" et retour a index.html
function retour(){
    sessionStorage.clear();
}
commande();
