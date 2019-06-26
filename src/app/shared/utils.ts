export function convertDBSnapshots<T>( snapshots ) {
    return <T[]> snapshots.map( snapshot => {
        return {
            id: snapshot.payload.doc.id,
            ... snapshot.payload.doc.data()
        };
    } )
}