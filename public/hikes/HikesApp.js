import Component from '../Component.js';
import Header from '../common/Header.js';
import Nav from '../common/Nav.js';
import Footer from '../common/Footer.js';
import HikesList from './HikesList.js';
// import Paging from './Paging.js';
import { getHikes } from '../services/hikes-api.js';

// !!!
// TO-DO STILL: MAKE THIS FOR THE PLANT APP! DELETE THIS LINE ONCE DONE!
// !!!

class HikesApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const nav = new Nav();
        dom.appendChild(nav.renderDOM());
        
        const listSection = dom.querySelector('.list-section');
        
        const hikesList = new HikesList({ 
            hikes: [], 
            onSearchSubmit: (array) => {
                let searchedHikes;
                if (!array){
                    searchedHikes = this.state.hikes;
                }
                else {
                    searchedHikes = array;
                }
                const updatedProps = { hikes: searchedHikes };
                hikesList.update(updatedProps);
            }    
        });
        listSection.appendChild(hikesList.renderDOM());
        
        // const paging = new Paging();
        // listSection.appendChild(paging.renderDOM());

        const footer = new Footer();
        dom.appendChild(footer.renderDOM());

        const loadHikes = async() => {
            try {
                const searchFormButton = dom.querySelector('.location-search-button');
                searchFormButton.addEventListener('submit', async(event) => {
                    event.preventDefault();

                    const hikes = await getHikes(event.target.value);
                    console.log(event.target.value);
                    localStorage.setItem('allHikes', JSON.stringify(hikes));
                    hikesList.update({ hikes: hikes });
                });
                


                
            }
            catch (err) {
                console.log(err);
            }
        };

        loadHikes();
        window.addEventListener('hashchange', () => {
            loadHikes();
        });
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                    <form class = "location-search">
                        <input type="text" name="search" placeholder="City, State">
                        <button class = 'location-search-button'>Search</button>
                    </form>
                    <button id = "current-location">Use Current Location</button>
                    <section class="list-section">
                        <!-- paging goes here -->
                        <!-- hikes list goes here -->        
                    </section>
                </main>
                <!-- footer goes here -->
            </div>
        `;
    }
}

export default HikesApp;