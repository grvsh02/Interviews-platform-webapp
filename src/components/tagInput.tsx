import {useEffect, useState} from 'react'
import './tag.css'
import GraphqlFetch from "../utils/graphqlFetch";

type TagsInputProps = {
    setNewTags?: ([]) => void
}

const TagsInput = ({setNewTags = () => {}}: TagsInputProps) => {
    const [tags, setTags] = useState([''])

    useEffect(() => {
        GraphqlFetch({
          query: `query {
            roles {
                role
            }
           }`,
        }).then((response) => {
            let rolesFetched: any[] = []
            response.data.roles.map((role: any) => {
                rolesFetched = [...rolesFetched,role.role]
            })
            setTags(rolesFetched)
        })
    },[])

    let newTags: any[] = []

    const handleKeyDown = (e: any) => {
        if(e.key !== 'Enter') return
        const value = e.target.value
        if(!value.trim()) return
        newTags = [...newTags, value]
        setNewTags(newTags)
        setTags([...tags, value])
        e.target.value = ''
    }

    const removeTag = (index: number) => {
        setTags(tags.filter((el, i) => i !== index))
    }

    return (
        <div className="tags-input-container">
            { tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            )) }
            <input type="text" tabIndex={0} onKeyDown={handleKeyDown} className="tags-input" placeholder="Type something" />
        </div>
    )
}

export default TagsInput