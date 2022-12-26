import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View ,Text, TouchableOpacity,Alert, Platform } from 'react-native';
import { Surface, Title, TextInput } from 'react-native-paper';
import ModalView from '../components/ModalView';
import PostCardItem from '../components/PostCardItem';

import { useDispatch, useSelector } from 'react-redux'
import { addPost, editPost, deletePost } from '../reducers/postReducer'

function Post() {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmitPost = () => {
        if (title.trim().length === 0) {
            Alert.alert("You need to enter a Post");
            setTitle("");
            setAuthor("");
            return;
        }
        dispatch(
            addPost({
                post: title,
                post: author,
            })
        );
        updatePost();
    };

    const onDeletePost = (id) => {
        dispatch(
            deletePost({
                id: id,
            })
        );
    };

    const onEditPost = (id, title, author) => {
        setVisible(true)
        dispatch(
            editPost({
                id: id,
                title: title,
                author: author
            })
        );
        updatePost();
    };

    const edit = (id, title, author) => {
        setVisible(true)
        setId(id)
        setTitle(title)
        setAuthor(author)
        setModalTitle('Edit Post')
    }

    const add = () => {
        setVisible(true);
        setModalTitle('Add Post')
    }

    const updatePost = () => {
        setVisible(false);
        setAuthor('')
        setTitle('')
        setId('')
    }
    const onRefresh = () => {
        setLoading(true);
        posts
    }

    return (
        <View  style={styles.container}>
            <Surface style={styles.header}>
                <Title>Posts</Title>
                <TouchableOpacity style={styles.button} onPress={add}>
                    <Text style={styles.buttonText}>Add Post</Text>
                </TouchableOpacity>
            </Surface>

            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                refreshing={loading}
                onRefresh={onRefresh}
                renderItem={({ item }) => (
                    <PostCardItem
                        title={item.title}
                        author={item.author}
                        onEdit={() => edit(item.id, item.title, item.author)}
                        onDelete={() => onDeletePost(item.id)}
                    />
                )}
            />

            <ModalView
                visible={visible}
                title={modalTitle}
                onDismiss={updatePost}
                onSubmit={() => {
                    if (id && title && author) {
                        onEditPost(id, title, author)
                    } else {
                        onSubmitPost(title, author)
                    }
                }}
                cancelable
            >

                <TextInput
                    label="Title"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    mode="outlined"
                />
                <TextInput
                    label="Author"
                    value={author}
                    onChangeText={(text) => setAuthor(text)}
                    mode="outlined"
                />
            </ModalView>
        </View>
    )
}

export default Post;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        padding: 16,
        margin: 16,
        elevation: 4,
        borderRadius: 8
    },
    logo: {
        width: 66,
        height: 58,
    },
    cardImage: {
        width: '100%',
        height: 110,
    },
    header: {
        marginTop: Platform.OS === 'android' ? 24 : 0,
        padding: 16,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'steelblue',
    },
    buttonText: {
        color: 'white'
    },
});
