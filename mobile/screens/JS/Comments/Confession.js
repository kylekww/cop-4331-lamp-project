import React, { useEffect, useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Confession(Props)
{
    const oid = Props._id;
    const[searchVal, setSearch] = useState(3);

    const[vote, setVote] = useState(0);
    const[interacted, setInteracted] = useState(null);
    const[confession, setConfession] = useState('');

    useEffect(() => {
        const data = fetch("https://hushucf.herokuapp.com/api/v1/confessions/searchConfession", {
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
                setConfession(data.confession);
                setVote(data.netVotes);
                setInteracted(data.userInteracted);
            })
        })
        .catch(err => {
            console.log(err);
        })}, []);

    return (
        <View style={styles.confession}>
            <Text style={{alignSelf: 'center'}}>{confession}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    confession: {
        alignSelf: 'center',
        width: '90%',
        height: '30%',
        backgroundColor: '#e7e8fe',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 30,
        borderWidth: 10,
        borderColor: '#000000',
        //top: '5%'
    }
});