// customize the experiment by specifying a view order and a trial structure
exp.customize = function() {
    // record current date and time in global_data
    this.global_data.startDate = Date();
    this.global_data.startTime = Date.now();
    // specify view order
    this.views_seq = [
        intro,
        //instructions,
        main,
        postTest,
        thanks
    ];

    attention_checks = _.shuffle(attention_checks).slice(0,4);

    const all_main_trials = main_trials;

    // exclude main trials that have an attribute the participant sees during attention check
    const attention_attributes = attention_checks.map(item => item.attribute);
    const updated_main_trials = all_main_trials.filter(item => !attention_attributes.includes(item.attribute));

    selected_main_trials = _.shuffle(updated_main_trials).slice(0,56);

    selected_main_trials.forEach(item => {
        sampled_item = _.shuffle(['woman', 'man', 'nonbinary person'])[0];
        item.person_term = sampled_item;
    });

    selected_main_trials.splice(14, 0, attention_checks[0]);
    selected_main_trials.splice(29, 0, attention_checks[1]);
    selected_main_trials.splice(44, 0, attention_checks[2]);
    selected_main_trials.splice(59, 0, attention_checks[3]);
    
    console.log("selected_main_trials");
    console.log(selected_main_trials);

    // main_trials.splice(used_context_index, 1)

    // main_trials = selected_main_trials.concat(attention_checks);
    main_trials = selected_main_trials;
    this.trial_info.main_trials = main_trials;
    // console.log("main trials: ", this.trial_info.main_trials);

    // adds progress bars to the views listed
    // view's name is the same as object's name
    this.progress_bar_in = ["main"];
    // this.progress_bar_in = ['practice', 'main'];
    // styles: chunks, separate or default
    this.progress_bar_style = "default";
    // the width of the progress bar or a single chunk
    this.progress_bar_width = 100;
};
