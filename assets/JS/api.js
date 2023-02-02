/*API: https://api.github.com/users*/ 


const inputPerfil = document.querySelector('.search-users');


                                    /*_____________________________________________________________*/

const msnError = document.querySelector('.msn-error');
const msnErrorText = document.querySelector('.text_error');
const msnErrorBoard = document.querySelector('.kybord_error');

                                    /*_____________________________________________________________*/
                                    
const perfilDataImage = document.querySelector('.icon-avatar-user');
const perfilDataText = document.querySelector('.info-elemets');
const perfilFollowers = document.querySelector('.total-followers');
const perfilFollowing = document.querySelector('.total-following');
const perfilDateCreated = document.querySelector('.created-user');
const perfilAvatar = document.querySelector('.user-avatar'); 
const perfilUser = document.querySelector('.user');

                                    /*_____________________________________________________________*/

class SearchProfile {

    getApiData = (username) => {
        fetch(`https://api.github.com/users/${username}`)
            .then(async response => {

                if(!response.ok){
                    if(username == '') {

                        msnError.setAttribute('class', 'msn-error-animation');
                        msnErrorText.innerHTML = ('Preencha o campo, para realizar a busca.');
                        msnErrorBoard.innerHTML = ('ಠ︵ಠ');

                        /*___________________________________________________________________*/

                        this.profileDataRecall();
                        
                    } else {

                        msnError.setAttribute('class', 'msn-error-animation');
                        msnErrorText.innerHTML = ('A conta informada, não foi encontrada!');
                        msnErrorBoard.innerHTML = ('(●__●)');

                        /*___________________________________________________________________*/

                        this.profileDataRecall();
                    
                    }                   
                } else {
                    msnError.setAttribute('class', 'msn-error');
                    this.date = await response.json();
                    this.profileDataShow();
                }

            })
    }

    profileDataShow = () => {
        perfilDataImage.setAttribute('class', 'icon-avatar-user-animation');
        perfilDataText.setAttribute('class', 'info-elemets-animation');

                                /*___________________________________________________________________*/

        perfilUser.innerHTML = (`@${this.date.login}`);
        perfilFollowers.innerHTML = (`${this.date.followers}`);
        perfilFollowing.innerHTML = (`${this.date.public_repos}`); 
        perfilDateCreated.innerHTML = (`${Intl.DateTimeFormat('pt-BR').format(new Date(this.date.created_at))}`);
        perfilAvatar.setAttribute('src', `${this.date.avatar_url}`);

        return;
    }

    profileDataRecall = () => {
        perfilDataImage.setAttribute('class', 'icon-avatar-user');
        perfilDataText.setAttribute('class', 'info-elemets');
    }

}

const PerfilData = new SearchProfile;


                                    /*_____________________________________________________________*/

inputPerfil.addEventListener('blur', ()=>{
    PerfilData.getApiData(inputPerfil.value);
});