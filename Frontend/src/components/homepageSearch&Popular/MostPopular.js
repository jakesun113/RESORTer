import React, { Component } from 'react';
import '../../css/homepageSearch&Popular/search.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

class ResortsCard extends Component {
    render(){
        return(
            <div style={{width:'306px',height:'468px',position:'relative',boxShadow:'2px 2px 10px 0.5px #cdd3d9'}}>
                <img src={this.props.imgSrc}
                style={{height:'226px'}}/>
                <div style={{paddingLeft:'10px',paddingRight:'10px'}}>
                    <div className="text-justify" style={{color:'#185b87'}}>{this.props.resortName}</div>
                    <div className="text-justify"style={{color:'#2ab4ff',fontSize:'15px'}}>{this.props.resortCountry}</div>
                    <div className="text-justify" style={{fontSize:'15px'}}>
                        {this.props.resortDescription}
                    </div>
                    <button className="btn" style={{width:'101px',position:'absolute',bottom:'2%',right:'2%'}}>Plan Now</button>
                </div>
            </div>
        );
    }
}
class MostPopular extends Component {
    render(){
        return(
            <div>
            <div className="text-justify">Most Searched Resorts</div>

             <div class="row">
                <div class="col-sm">
                <ResortsCard 
                imgSrc='https://static.wixstatic.com/media/25b4a3_1a4b1cf38dfe4b77ba41b706e1d2b348~mv2.jpg/v1/fill/w_153,h_113,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_1a4b1cf38dfe4b77ba41b706e1d2b348~mv2.webp' 
                resortName='Cardrona' 
                resortCountry='New Zealand' 
                resortDescription='Cardrona Alpine Resort is New Zealand’s most popular ski area, attracting all kinds of snow enthusiasts – from beginners & families, to Olympic & X Games athletes'/>
                </div>
                <div class="col-sm">
                <ResortsCard 
                imgSrc='https://static.wixstatic.com/media/25b4a3_ee71f812f1384d47afc896fdb57bf137~mv2.jpg/v1/fill/w_153,h_113,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_ee71f812f1384d47afc896fdb57bf137~mv2.webp' 
                resortName='Coronet Peak' 
                resortCountry='New Zealand' 
                resortDescription="Spectacular roller coaster terrain makes Coronet Peak ski area one of New Zealand's most exciting ski resort destinations for snow lovers of any ability."/>
                </div>
                <div class="col-sm">
                <ResortsCard 
                imgSrc='https://static.wixstatic.com/media/407189_5475794bed1646b29179d5f8440fcfd0~mv2_d_1923_1497_s_2.jpg/v1/fill/w_153,h_113,al_c,q_80,usm_0.66_1.00_0.01/407189_5475794bed1646b29179d5f8440fcfd0~mv2_d_1923_1497_s_2.webp' 
                resortName='Falls Creek' 
                resortCountry='Australia' 
                resortDescription='Falls Creek is beginner/intermediate friendly, with almost 80% of the resort dedicated to these types of skiers/snowboarders.'/>
                </div>
            </div>

            <div class="row">
                <div class="col-sm">
                <ResortsCard 
                imgSrc='https://static.wixstatic.com/media/25b4a3_c4a876f919e94598a3e717714b801101~mv2.jpeg/v1/fill/w_153,h_113,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_c4a876f919e94598a3e717714b801101~mv2.webp' 
                resortName='Mt.Buller' 
                resortCountry='Australia' 
                resortDescription="Just three hours' drive from Melbourne, Mt Buller is close enough for a day’s escape yet far enough away for a holiday. Mt Buller has everything you need for the perfect winter snow experience."/>
                </div>
                <div class="col-sm">
                <ResortsCard 
                imgSrc='https://static.wixstatic.com/media/25b4a3_9fd9030e0acb4f3098694539631ad011~mv2.jpg/v1/fill/w_153,h_113,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_9fd9030e0acb4f3098694539631ad011~mv2.webp' 
                resortName='Perisher' 
                resortCountry='Australia' 
                resortDescription='With four resort areas and over 3,000 acres of skiable terrain all of which interlink, you will definitely want to get around all of them.'/>
                </div>
                <div class="col-sm">
                <ResortsCard 
                imgSrc='https://static.wixstatic.com/media/25b4a3_12262db407d3462fb2febe16847c72de~mv2.jpg/v1/fill/w_153,h_113,al_c,q_80,usm_0.66_1.00_0.01/25b4a3_12262db407d3462fb2febe16847c72de~mv2.webp' 
                resortName='Thredbo' 
                resortCountry='Australia' 
                resortDescription='Thredbo, located within the Kosciuszko National Park, boasts some of Australia’s highest mountains between 1365 to 1930 metres above sea level.'/>
                </div>
            </div>
            </div>
        );
    }
}
export default MostPopular;
