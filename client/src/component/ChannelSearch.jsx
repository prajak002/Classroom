import React ,{useState, useEffect}from 'react';
import{useChatContext} from 'stream-chat-react';
import{SearchIcon} from '../assets';
const ChannelSearch = () => {
   /* const { client, setActiveChannel } = useChatContext();*/
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    /*const [teamChannels, setTeamChannels] = useState([])
    const [directChannels, setDirectChannels] = useState([])*/
const getChannels=async(text)=>{
    try{
        /*fetch  channel*/
    }
    catch(error){
        setQuery('');
    }
}
const onSearch=(event)=>{
    event.preventDefault();
    setLoading(true);
    setQuery(event.target.value);
    getChannels(event.target.value);
}

  return (<div className="channel-search_container">
      <div className="channel-search__input__wrapper">
          <div className="channel-search__input__icon">
              <SearchIcon/>
          </div>
          <input className="chaznnel-search__input__text" 
          placeholder="search"
          type="text" 
          value={query}
          onChange={onSearch}  />

      </div>
  </div>
  );
};

export default ChannelSearch;
