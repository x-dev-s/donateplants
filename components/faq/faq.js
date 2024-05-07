'use client'
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
    }, []);
    return (
        <div className="container mx-auto my-5">
            <h1 className="mb-3">Frequently Asked Questions</h1>
            {
                faqs && faqs.map((category, mainindex) =>
                (
                    <div key={mainindex}>
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id={`heading${mainindex}`}>
                                    <button className="accordion-button collapsed" type="button" onClick={handleClick} data-bs-toggle="collapse" aria-expanded="false" data-bs-target={`#collapse${mainindex}`} aria-controls={`collapse${mainindex}`}>
                                        {category.name}
                                    </button>
                                </h2>
                                <div id={`collapse${mainindex}`} className="accordion-collapse visually-hidden " aria-labelledby={`heading${mainindex}`} data-bs-parent="#accordionExample">
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

const handleClick = (e) => {
    const target = e.target;
    // target.classList.toggle('collapsed');
    const parent = target.parentElement;
    const collapse = parent.nextElementSibling;
    collapse.classList.toggle('visually-hidden');
    collapse.classList.toggle('visible');
}