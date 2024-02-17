import logo from './logo.svg';
import './App.css';
import { Badge, Button, Heading, Pane, Paragraph, Spinner, TextInput } from 'evergreen-ui';
import { useState } from 'react';

function App() {
  const [word, setWord] = useState('')
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState({})


  const searchWord = async () => {
    if(!word.length>0) return
    setLoading(true)
    try {
      const res = await fetch("https://wordsapiv1.p.rapidapi.com/words/" + word, {
        headers: {
          'X-RapidAPI-Key': "",
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
      })

      const data = await res?.json()

      console.log(data)
      setDetails(data)

    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">


      <Pane textAlign='center'>
        <Heading size={900} fontWeight={900} marginTop={20} marginBottom={20} color="#fff">Word Dictionary</Heading>
        <TextInput onChange={e => setWord(e.target.value)} value ={word} placeholder='Search for a word...' />

        <Button onClick={searchWord} isLoading={loading} disabled={loading} appearance='primary'>Search</Button>
      </Pane>

      {loading ?
        <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
          <Spinner />
        </Pane>      
      : ""}

      {/* background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%); */}
      {loading===false &&  details?.word ? 
        <Pane style={{width: '700px', height: '60vh', overflow: 'auto', margin: '10vh auto', boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", padding: 30, background: "#fff"}}>

          <Pane style={{display: 'flex', justifyContent: 'space-between'}}>
            <Heading marginBottom={10}>Word: <span style={{fontFamily: 'monospace'}}>{details?.word}</span></Heading>

            <Heading marginBottom={10}>Frequency: <span style={{fontFamily: 'monospace'}}><Badge color="green">{details?.frequency}</Badge></span></Heading>
          </Pane>
          <Heading marginBottom={10}>Pronunciation: <span style={{fontFamily: 'monospace'}}>{details?.pronunciation?.all}</span></Heading>
          
          <Heading marginBottom={10}>Syllables: <span style={{fontFamily: 'monospace'}}>{details?.syllables?.count}</span></Heading>
          {
            details?.syllables?.list?.map((sy, idx) => (
              <Pane key={idx}>
                <Paragraph>{idx+1}. {sy}</Paragraph>
              </Pane>
            ))
          }


          
          <Heading marginBottom={10}>Definitions:</Heading>
          {
            details?.results?.map(({definition, synonyms, examples}, idx) => (
              <Pane key={idx} style={{marginLeft: 20}}>
                <Paragraph>{idx+1}. {definition}</Paragraph>
              
                <Pane style={{marginLeft: 20, marginTop: 10, marginBottom: 10}}>
                  {synonyms?.length ? <Heading size={100} fontWeight={900}>Synonyms</Heading> : ''}
                  {
                    synonyms?.map((sy, idx) => (
                      <Pane key={idx}>
                        <Paragraph>{idx+1}. {sy}</Paragraph>
                      </Pane>
                    ))
                  }
                </Pane>

                <Pane style={{marginLeft: 20, marginTop: 10, marginBottom: 20}}>
                  {examples?.length ? <Heading size={100} fontWeight={900}>Examples</Heading> : ''}
                  {
                    examples?.map((ex, idx) => (
                      <Pane key={idx}>
                        <Paragraph>{idx+1}. {ex}</Paragraph>
                      </Pane>
                    ))
                  }
                </Pane>     
                <hr/>           
              </Pane>
            ))
          }
        </Pane>
      :
        ""
      }
    </div>
  );
}

export default App;
