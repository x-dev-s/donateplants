import Card from "@/components/howtoplay/card"

export const metadata = {
    title: "How to Play",
    description: "Learn how to play the draws",
    image: "/images/logo.png"
}

export default function HowToPlay(){

    return (
        <div className="container mx-auto text-center my-5">
            <h1>How to Play</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 gap-x-4 pt-36 pb-3">
                <Card title="Step 1" description="Create an account" image="/images/howtoplay/step1.png" />
                <Card title="Step 2" description="Deposit money" image="/images/howtoplay/step2.png" />
                <Card title="Step 3" description="Make a donation" image="/images/howtoplay/step3.png" />
                <Card title="Step 4" description="Play the draw" image="/images/howtoplay/step4.png" />
                <Card title="Step 5" description="Wait for the results" image="/images/howtoplay/step5.png" />
                <Card title="Step 6" description="Claim your prize" image="/images/howtoplay/step6.png" />
            </div>
        </div>
    )
}