import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase'

const supabaseUrl: string = 'https://jajihoptqivlcfjmauso.supabase.co'
const supabaseKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imphamlob3B0cWl2bGNmam1hdXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY1NTExMjcsImV4cCI6MjA0MjEyNzEyN30.nMcE_Q34ctG3C03seMp3RQarvcoi5su7pQJzfKXFPoI'
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export async function addPointsToDb(nickname:string, points:number) {

    if (!nickname) {
        alert("Nickname is needed")
        return
    }

    const {data, error} = await supabase.from('ranking').insert([
        {
        nickname: nickname,
        points: points
        }
    ]).select()

    if (error) {
        alert("Error occured " + error.message)
        return
    }

    console.log(data)
    return data.at(0)
}