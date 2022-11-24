import React, {useEffect, useState} from 'react';

export default function SearchConfessions(searchVal, oid){
  const [post, setPosts] = useState([]);
  const[length, setLength] = useState(15);
  const[wasLastList, setWasLastList] = useState(false);
  useEffect(() => {
    setPosts([]);
    console.log('we are here');
  }, [searchVal]);
    useEffect(() => {
        const displayPosts = async event =>
        {
          const data = await fetch("/api/v1/confessions/searchConfession", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              searchVal,
              oid,
            }),
          })
          .then(res => {
            res.json().then((data) => {
                
              console.log(data);
              if(data.length < 15){
                setWasLastList(true);
                setPosts([...post, ...data]);
                return;
              }
              setPosts([...post, ...data]);
              setLength(data.length);
              console.log(oid);

              //console.log(length);
            }) 
          })
          .catch(err => {
            console.log(err);
          });
        }
        if(!wasLastList)
            displayPosts();
        
    }, [searchVal, oid])
    return {length, post};
}