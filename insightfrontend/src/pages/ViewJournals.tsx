import { BentoGrid, BentoGridItem } from '@/components/bento-grid'
import axios from 'axios'
import Cookie from 'js-cookie'
import { useEffect, useState } from 'react'
import { truncateTo10Words } from '@/lib/utils'

interface Journal {
    title: string;
    journal: string;
    insight: string;
    date:string;
    id:string
}

const Viewjournals = () => {
    const [journals, setJournals] = useState([])
    const [loading, setLoading] = useState(true)
    const token = Cookie.get('token')
    
    const getJournals = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8787/api/v1/journal', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setJournals(response.data.journals);
        } catch (error) {
            console.error("Error fetching journals:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getJournals()
    }, [])
    
    if (loading) {
        return <div>Loading...</div>
    }


    return (
        <BentoGrid className="max-w-4xl mx-auto">
            {journals.map((journal: Journal, i) => (
                <BentoGridItem 
                    key={i} 
                    title={journal.title} 
                    description={truncateTo10Words(journal.journal)} 
                    header={truncateTo10Words(journal.insight)} 
                    className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                    id={journal.id}
                />
            ))}
        </BentoGrid>
    )
}

export default Viewjournals;