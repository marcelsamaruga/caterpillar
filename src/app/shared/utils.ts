export function convertDBSnapshots<T>( snapshots ) {
    return <T[]> snapshots.map( snapshot => {
        return {
            id: snapshot.payload.doc.id,
            ... snapshot.payload.doc.data()
        };
    } )
}

export function convertDBSnapshotsByOne<T>( snapshot ) {
    return <T> {
            id: snapshot.payload.id,
            ... snapshot.payload.data()
        };
}