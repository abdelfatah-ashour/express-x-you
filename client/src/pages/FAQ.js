import React from 'react';
import Layout from '../components/Layout';

export default function FAQ() {
  return (
    <Layout
      title="FAQ"
      description='Stands for "Frequently Asked Questions." An FAQ, pronounced "F-A-Q," is a list of answers to common questions about a specific product or service.'>
      <div className="container">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '400px' }}>
          <div className="accordion w-75" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne">
                  Fix a problem
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                  ea tenetur quisquam enim corrupti quis eaque sequi iusto,
                  nulla facilis delectus saepe illo perferendis similique
                  labore, neque aliquid eveniet harum!
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo">
                  Manage your account and settings
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis, laudantium voluptatibus? Officia reprehenderit
                  veniam tempore atque consequuntur delectus a impedit sunt quas
                  hic, distinctio iure cum laboriosam, vitae, quos eligendi!
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree">
                  Policy, safety and copyright
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                  ducimus molestias saepe, eos ratione et recusandae soluta,
                  neque itaque dolores id dolorum voluptates eveniet autem
                  consequuntur esse facilis quidem earum?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
