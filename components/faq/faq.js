'use client'
import { set } from "mongoose";
import { useEffect, useState } from "react"

export default function FAQs() {
    const [faqs, setFaqs] = useState([]);
    const getFaqs = async () => {
        const response = await fetch("/data/faqs.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const data = await response.json();
            setFaqs(data);
            return
        }
        return [];
    }
    useEffect(() => {
        getFaqs();
        let interval = setInterval(() => {
            if (document.getElementById('pageloading').classList.contains('hidden') && faqs.length > 0) {
                let accordions = document.querySelectorAll('.accordion');
                for (let accordion of accordions) {
                    accordion.classList.add('animate-[slideDownFadeIn_1s_ease]');
                };
                clearInterval(interval);
            }
        }, 400);
    }, [faqs]);
    return (
        <div className="container mx-auto my-5">
            <h1 className="pb-3">Frequently Asked Questions</h1>
            {
                faqs && faqs.map((category, mainindex) =>
                (
                    <div key={mainindex}>
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id={`heading${mainindex}`}>
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" aria-expanded="false" data-bs-target={`#collapse${mainindex}`} aria-controls={`collapse${mainindex}`}>
                                        {category.name}
                                    </button>
                                </h2>
                                <div id={`collapse${mainindex}`} className="accordion-collapse collapse" aria-labelledby={`heading${mainindex}`} data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        {
                                            category.data.map((faq, index) =>
                                            (
                                                <div key={index}>
                                                    <b>{index + 1}. {faq.question}</b>
                                                    <p>{faq.answer}</p>
                                                </div>
                                            )
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

                )
            }

        </div>
    )
}