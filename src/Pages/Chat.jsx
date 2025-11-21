import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MdAccountCircle } from "react-icons/md";
import { MdCall, MdVideocam, MdMoreVert } from "react-icons/md";
import { db } from '../../firebase'
import { collection, doc, onSnapshot, orderBy, query, addDoc, serverTimestamp } from 'firebase/firestore'

function Chat() {
    const user = useSelector((state) => state.home.user)
    const uid = user?.uid
    const [chats, setChats] = useState([])
    const [search, setSearch] = useState('')
    const [selectedChatId, setSelectedChatId] = useState('')
    const [selectedChatUsers, setSelectedChatUsers] = useState([])
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [loadingChats, setLoadingChats] = useState(true)

    useEffect(() => {
        const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'))
        const unsub = onSnapshot(q, (snap) => {
            setChats(snap.docs.map(d => ({ id: d.id, ...d.data() })))
            setLoadingChats(false)
        }, () => setLoadingChats(false))
        return () => unsub()
    }, [])

    useEffect(() => {
        if (!selectedChatId) return
        const messagesRef = collection(db, 'chats', selectedChatId, 'messages')
        const q = query(messagesRef, orderBy('createdAt', 'asc'))
        const unsub = onSnapshot(q, (snap) => {
            setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        })
        return () => unsub()
    }, [selectedChatId])

    const selectChat = (chat) => {
        setSelectedChatId(chat.id)
        setSelectedChatUsers(chat.users || [])
    }

    const otherUserId = useMemo(() => {
        if (!uid || !selectedChatUsers?.length) return ''
        const others = selectedChatUsers.filter(u => u !== uid)
        return others[0] || ''
    }, [uid, selectedChatUsers])

    const handleSend = async (e) => {
        e.preventDefault()
        if (!uid || !selectedChatId || !newMessage.trim()) return
        try {
            const messagesRef = collection(db, 'chats', selectedChatId, 'messages')
            await addDoc(messagesRef, {
                text: newMessage.trim(),
                senderId: uid,
                recipientId: otherUserId,
                createdAt: serverTimestamp()
            })
            setNewMessage('')
        } catch (err) {
            console.error('Send message error:', err)
        }
    }

    const filteredChats = chats.filter(c => {
        if (!search.trim()) return true
        const q = search.trim().toLowerCase()
        const idText = (c.id || '').toLowerCase()
        return idText.includes(q)
    })

    return (
        <div>
            <Link to="/SuccessS"> </Link>
            <div style={{ height: 635, width: 1120, backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "stretch" }}>
                <div style={{ height: '100%', width: 400, backgroundColor: "white", border: '1px solid #e1e5e9', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: 12, borderBottom: '1px solid #e1e5e9' }}>
                        <h3 style={{ margin: 0, color: '#003366' }}>Messages</h3>
                        <input
                            type="text"
                            placeholder="Search chats by ID"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ padding: '8px', width: '100%', borderRadius: 8, border: '2px solid #e1e5e9', marginTop: 8 }}
                        />
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {loadingChats ? (
                            <div style={{ padding: 12 }}>Loading...</div>
                        ) : filteredChats.length === 0 ? (
                            <div style={{ padding: 12, color: '#666' }}>No chats found</div>
                        ) : (
                            filteredChats.map(chat => (
                                <div key={chat.id} onClick={() => selectChat(chat)} style={{ cursor: 'pointer', padding: 12, borderBottom: '1px solid #e1e5e9', backgroundColor: selectedChatId === chat.id ? '#f1f7ff' : 'white' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <MdAccountCircle size={28} color='#003366' />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 600, color: '#333' }}>Chat: {chat.id}</div>
                                            <div style={{ fontSize: 12, color: '#666' }}>Users: {(chat.users || []).join(', ')}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div style={{ height: '100%', width: 717, backgroundColor: "white", border: '1px solid #e1e5e9', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: 12, borderBottom: '1px solid #e1e5e9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <MdAccountCircle size={32} color='#003366' />
                            <div>
                                <div style={{ fontWeight: 700, color: '#333' }}>{selectedChatId ? `Chat ${selectedChatId}` : 'Select a chat'}</div>
                                <div style={{ fontSize: 12, color: '#666' }}>{selectedChatUsers.length ? `With: ${selectedChatUsers.join(', ')}` : ''}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <MdCall size={24} color="grey" />
                            <MdVideocam size={24} color="grey" />
                            <MdMoreVert size={24} color="grey" />
                        </div>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
                        {!selectedChatId ? (
                            <div style={{ color: '#666' }}>Choose a chat from the left to view messages.</div>
                        ) : messages.length === 0 ? (
                            <div style={{ color: '#666' }}>No messages yet.</div>
                        ) : (
                            messages.map(m => (
                                <div key={m.id} style={{ display: 'flex', justifyContent: m.senderId === uid ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
                                    <div style={{ maxWidth: 420, backgroundColor: m.senderId === uid ? '#e8f0fe' : '#ffffff', border: '1px solid #e1e5e9', borderRadius: 10, padding: '8px 12px' }}>
                                        <div style={{ fontSize: 14, color: '#333' }}>{m.text}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <form onSubmit={handleSend} style={{ borderTop: '1px solid #e1e5e9', padding: 12, display: 'flex', gap: 8 }}>
                        <input
                            type="text"
                            placeholder={uid ? "Type a message" : "Login to send messages"}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            disabled={!uid || !selectedChatId}
                            style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '2px solid #e1e5e9' }}
                        />
                        <button type="submit" disabled={!uid || !selectedChatId || !newMessage.trim()} style={{ backgroundColor: "#003366", color: "white", border: 'none', borderRadius: 8, padding: '10px 16px', fontWeight: 600 }}>Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chat