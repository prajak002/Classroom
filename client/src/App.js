
import React from 'react';
import {StreamChat} from 'stream-chat';
import "./App.css";
import{ChannelList, chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import {ChannelContainerlist,ChannelContainer} from './component/';

const apikey='d59r4ymbj9at';
const client= StreamChat.getInstance(apikey);


const App = () => {
  return (
  <div >
    
    <chat  className="app_wrapper" client={client} theme="team light">
      <ChannelContainerlist/>
      <ChannelContainer/>
      
      
    </chat>
  </div>
  );
};

export default App;
