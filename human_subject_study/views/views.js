var intro = {
    name: "intro",
    // introduction title
    title: "Stanford NLP Group",
    // introduction text
    text:
    "Welcome to the study!<br><br>People use various physical characteristics to describe others all the time. In this study, you will see a total of <strong>40 physical characteristics</strong>, and your task is to provide a rating for each physical characteristic.<br><br>Please pay close attention to the questions, and answer each question carefully. The whole study should take no longer than <strong>5 minutes</strong>.<br><small>If you have any questions or concerns, don't hesitate to contact me at llin001@ucla.edu.</small> ",
    legal_info: 
    `<strong>LEGAL INFORMATION</strong><br><br>
<strong>UNIVERSITY OF CALIFORNIA, LOS ANGELES</strong><br><br>
<strong>STUDY INFORMATION</strong><br>
A Study of Evaluating Physical Characteristics<br><br>
Lin Lin & Elisa Kreiss from the Department of Communication at the University of California, Los Angeles are conducting a research study. Your participation in this research study is completely voluntary. By signing this statement you are agreeing you are over the age of 18.<br><br>

<strong>WHAT SHOULD I KNOW ABOUT A RESEARCH STUDY?</strong><br>
\u25CF We will explain this research study to you.<br>
\u25CF Whether or not you take part is up to you.<br>
\u25CF You can choose not to take part.<br>
\u25CF You can agree to take part and later change your mind.<br>
\u25CF Your decision will not be held against you.<br>
\u25CF You can ask all the questions you want before you decide.<br><br>

<strong>WHY IS THIS RESEARCH BEING DONE?</strong><br>
You are being asked to participate in this study because the researcher wants to understand how people describe others and make judgments.<br><br>

<strong>HOW LONG WILL THE RESEARCH LAST AND WHAT WILL I NEED TO DO?</strong><br>
Participation will take a total of about 5 minutes. If you volunteer to participate in this study, the researcher will ask you to do the following:<br>
\u25CF Rate physical characteristics for male, female, and a nonbinary person.<br>
\u25CF Complete questionnaires about your background.<br><br>

<strong>ARE THERE ANY RISKS IF I PARTICIPATE?</strong><br>
There are no anticipated discomforts or risks.<br><br>

<strong>ARE THERE ANY BENEFITS IF I PARTICIPATE?</strong><br>
You will not directly benefit from your participation in the research. However, the results of the research may help us to better understand what determines people’s judgments of others.<br><br>

<strong>WHAT OTHER CHOICES DO I HAVE IF I DECIDE NOT TO PARTICIPATE?</strong><br>
Your alternative to participating in this research study is to not participate.<br><br>

<strong>HOW WILL INFORMATION ABOUT ME AND MY PARTICIPATION BE KEPT CONFIDENTIAL?</strong><br>
The researchers will do their best to make sure that your private information is kept confidential. Information about you will be handled as confidentially as possible, but participating in research may involve a loss of privacy and the potential for a breach in confidentiality. Study data will be physically and electronically secured. As with any use of electronic means to store data, there is a risk of breach of data security.<br><br>

<strong>Use of personal information that can identify you:</strong><br>
We will not collect any personal information that could identify you.<br><br>

<strong>How information about you will be stored:</strong><br>
The anonymized data collected as part of this study will be stored in a safe and secure location.<br><br>

<strong>People and agencies that will have access to your information:</strong><br>
The research team, authorized UCLA personnel, may have access to study data and records to monitor the study. Research records provided to authorized, non-UCLA personnel will not contain identifiable information about you. Publications and/or presentations that result from this study will not identify you by name.<br><br>

Employees of the University may have access to identifiable information as part of routine processing of your information, such as lab work or processing payment. However, University employees are bound by strict rules of confidentiality.<br><br>

<strong>How long information from the study will be kept:</strong><br>
Any data that might carry a risk of potential de-anonymization will be destroyed within a year after the study. The anonymized data will be stored in a data repository for future research use.<br><br>

<strong>USE OF DATA FOR FUTURE RESEARCH</strong><br>
Your data, including de-identified data, may be kept for use in future research.<br><br>

<strong>WILL I BE PAID FOR MY PARTICIPATION?</strong><br>
You will receive $1 for your participation in this study.<br><br>

<strong>UCLA Office of the Human Research Protection Program (OHRPP):</strong><br>
If you have questions about your rights as a research subject, or you have concerns or suggestions and you want to talk to someone other than the researchers, you may contact the UCLA OHRPP by phone: (310) 206-2040; by email: <a href='mailto:participants@research.ucla.edu'>participants@research.ucla.edu</a> or by mail: Box 951406, Los Angeles, CA 90095-1406.<br><br>

<strong>WHAT ARE MY RIGHTS IF I TAKE PART IN THIS STUDY?</strong><br>
\u25CF You can choose whether or not you want to be in this study, and you may withdraw your consent and discontinue participation at any time.<br>
\u25CF Whatever decision you make, there will be no penalty to you, and no loss of benefits to which you were otherwise entitled.<br>
\u25CF You may refuse to answer any questions that you do not want to answer and still remain in the study.<br><br>`,

    // introduction's slide proceeding button text
    buttonText: "Begin experiment",
    // render function renders the view
    render: function() {
        var viewTemplate = $("#intro-view").html();
        
        $("#main").html(
        Mustache.render(viewTemplate, {
                picture: "stimuli/stanford-nlp-logo.jpg",
                title: this.title,
                text: this.text,
                legal_info: this.legal_info,
                button: this.buttonText
            })
        );

        var prolificId = $("#prolific-id");
        var IDform = $("#prolific-id-form");
        var next = $("#next");

        var showNextBtn = function() {
            if (prolificId.val().trim() !== "") {
                next.removeClass("nodisplay");
            } else {
                next.addClass("nodisplay");
            }
        };

        if (config_deploy.deployMethod !== "Prolific") {
            IDform.addClass("nodisplay");
            next.removeClass("nodisplay");
        }

        prolificId.on("keyup", function() {
            showNextBtn();
        });

        prolificId.on("focus", function() {
            showNextBtn();
        });

        // moves to the next view
        next.on("click", function() {
            if (config_deploy.deployMethod === "Prolific") {
                exp.global_data.prolific_id = prolificId.val().trim();
            }

            exp.findNextView();
        });
    },
    // for how many trials should this view be repeated?
    trials: 1
};

var instructions = {
    name: "instructions",
    render: function(CT) {
        var viewTemplate = $("#instructions-view").html(); // don't think we even need mustache yet

        $("#main").html(
            Mustache.render(viewTemplate, {})
        );

        var next_button = $("#next");

        next_button.on('click', function () {
            exp.findNextView();
        });

    },
    trials: 1
};

var main = {
    name: "main",
    render: function(CT) {
        // fill variables in view-template
        console.log(exp.trial_info.main_trials[CT]);
        var viewTemplate = $("#main-view").html();

        let person_term = exp.trial_info.main_trials[CT]['person_term'];
        let attribute = exp.trial_info.main_trials[CT]['attribute'];
        let question = "How likely is it for someone to say that a <strong>" + person_term + "</strong> has <strong>" + attribute + "</strong>?";

        // for debugging:
        // let question = "How likely is it for someone to say that a <strong>woman</strong> has <strong>a beard</strong>?"

        $("#main").html(
            Mustache.render(viewTemplate, {
                instruction: `<p id="instruction-text">Please answer the following question:</p>`, // New instruction text
                q1: question,
                q1_slider_left: "Not at all",
                q1_slider_right: "Extremely likely"
                // q1: exp.trial_info.main_trials[CT]['question'],
                // q1_slider_left: q1['sl_left'],
                // q1_slider_right: q1['sl_right']
            })
        );

        window.scrollTo(0,0);

        // var error = $('#error');
        // var next = $('#next');
        
        // functions
        function responses_complete() {
            return($('input[name=slider1]:checked').val() > 0)
        };

        // var q1_resp = $('input[name=slider1]:checked').val();

        // event functions
        $("#next").on("click", function(e) {
            // when input is selected, response and additional info stored in exp.trial_info
            if (!responses_complete()) {
                $('#error').css({"display": "block"});
                // state = STATES.RESPOND;
                // respond_area.css({"display" : "inline"});
                // alt_text.css({"opacity": "1"});
                // comment_area.css({"display" : "inline"});
                // show_img.css({"display" : "block"});
                // instruction.text("Now answer the questions below!");
                // next.text("Continue!");
                // next.css({"display": "none"});
                // rt_article_read = Date.now();
            }
            else {
                rt_trial_done = Date.now();
                var trial_data = {
                    trial_number: CT + 1,
                    question: question,
                    person_term: person_term,
                    attribute: attribute,
                    rating: $('input[name=slider1]:checked').val(),
                    rt_trial: (rt_trial_done - startingTime) /1000
                };
                // console.log("FIRST TIME LOGGING THINGS!");
                // console.log((rt_trial_done - startingTime) /1000);
                // console.log(trial_data);

                exp.trial_data.push(trial_data);
                exp.findNextView();
            }
        })

        // record trial starting time
        var startingTime = Date.now();
    },
    trials: 40
};

var postTest = {
    name: "postTest",
    title: "Additional Info",
    text:
        "Answering the following questions is optional, but will help us understand your answers.",
    buttonText: "Continue",
    render: function() {
        var viewTemplate = $("#post-test-view").html();
        $("#main").html(
            Mustache.render(viewTemplate, {
                title: this.title,
                text: this.text,
                buttonText: this.buttonText
            })
        );

        $("#next").on("click", function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.HitCorrect = $("#HitCorrect").val();
            exp.global_data.age = $("#age").val();
            // exp.global_data.education = $("#education").val();
            exp.global_data.languages = $("#languages").val();
            exp.global_data.enjoyment = $("#enjoyment").val();
            exp.global_data.comments = $("#comments")
                .val()
                .trim();
            // exp.global_data.difficulties = $("#difficulties")
            //     .val()
            //     .trim();
            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent =
                (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // moves to the next view
            exp.findNextView();
        });
    },
    trials: 1
};

var thanks = {
    name: "thanks",
    message: "Thank you for taking part in this experiment!",
    render: function() {
        var viewTemplate = $("#thanks-view").html();

        // what is seen on the screen depends on the used deploy method
        //    normally, you do not need to modify this
        if (
            config_deploy.is_MTurk ||
            config_deploy.deployMethod === "directLink"
        ) {
            // updates the fields in the hidden form with info for the MTurk's server
            $("#main").html(
                Mustache.render(viewTemplate, {
                    thanksMessage: this.message
                })
            );
        } else if (config_deploy.deployMethod === "Prolific") {
            $("main").html(
                Mustache.render(viewTemplate, {
                    thanksMessage: this.message,
                    extraMessage:
                        "Please press the button below to confirm that you completed the experiment with Prolific. Your completion code is CFLAWLT4.<br />" +
                        "<a href=" +
                        config_deploy.prolificURL +
                        ' class="prolific-url">Confirm</a>'
                })
            );
        } else if (config_deploy.deployMethod === "debug") {
            $("main").html(Mustache.render(viewTemplate, {}));
        } else {
            console.log("no such config_deploy.deployMethod");
        }

        exp.submit();
    },
    trials: 1
};

function toggleTextbox() {
    var genderSelect = document.getElementById("gender");
    var otherGenderContainer = document.getElementById("other-gender-container");

    if (genderSelect.value === "other") {
        otherGenderContainer.style.display = "block"; // Show textbox
    } else {
        otherGenderContainer.style.display = "none"; // Hide textbox
    }
}

