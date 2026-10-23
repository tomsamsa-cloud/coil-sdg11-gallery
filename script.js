function navigateTo(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('.page-section');
            pages.forEach(page => {
                page.classList.remove('active');
            });

            // Show selected page
            const targetPage = document.getElementById(`page-${pageId}`);
            if (targetPage) {
                targetPage.classList.add('active');
            }

            // Update Desktop Nav styles
            const navButtons = document.querySelectorAll('.nav-btn');
            navButtons.forEach(btn => {
                btn.classList.remove('text-amber-400', 'bg-slate-800');
                btn.classList.add('text-slate-300');
            });

            const activeBtn = document.getElementById(`nav-${pageId}`);
            if (activeBtn) {
                activeBtn.classList.remove('text-slate-300');
                activeBtn.classList.add('text-amber-400', 'bg-slate-800');
            }

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Mobile Menu Toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // Our Actions Interactive Matching Game Logic
        let selectedProblem = null;
        let selectedSolution = null;
        let matchesCount = 0;
        const totalMatches = 4;

        function selectProblem(element) {
            if (element.classList.contains('matched')) return;

            // Deselect previous problem
            document.querySelectorAll('#problems-list .matching-item').forEach(item => {
                if (!item.classList.contains('matched')) {
                    item.classList.remove('selected');
                }
            });

            element.classList.add('selected');
            selectedProblem = element;

            updateStatus("Now click the matching solution on the right column.");
            checkMatch();
        }

        function selectSolution(element) {
            if (element.classList.contains('matched')) return;

            // Deselect previous solution
            document.querySelectorAll('#solutions-list .matching-item').forEach(item => {
                if (!item.classList.contains('matched')) {
                    item.classList.remove('selected');
                }
            });

            element.classList.add('selected');
            selectedSolution = element;

            if (!selectedProblem) {
                updateStatus("Now select a problem on the left to match!");
            } else {
                checkMatch();
            }
        }

        function checkMatch() {
            if (selectedProblem && selectedSolution) {
                const probId = selectedProblem.getAttribute('data-id');
                const solId = selectedSolution.getAttribute('data-id');

                if (probId === solId) {
                    // Match found!
                    selectedProblem.classList.remove('selected');
                    selectedSolution.classList.remove('selected');

                    selectedProblem.classList.add('matched');
                    selectedSolution.classList.add('matched');

                    // Update icons
                    selectedProblem.querySelector('.status-icon').className = "fas fa-check-circle text-emerald-500 status-icon";
                    selectedSolution.querySelector('.status-icon').className = "fas fa-check-circle text-emerald-500 status-icon";

                    selectedProblem = null;
                    selectedSolution = null;
                    matchesCount++;

                    if (matchesCount === totalMatches) {
                        updateStatus("🎉 Excellent! You have successfully matched all problems with their solutions!", true);
                    } else {
                        updateStatus("✅ Correct match! Pick another problem.");
                    }
                } else {
                    // Incorrect match
                    updateStatus("❌ Not a match. Try pairing again!", false);
                    setTimeout(() => {
                        if (selectedProblem) selectedProblem.classList.remove('selected');
                        if (selectedSolution) selectedSolution.classList.remove('selected');
                        selectedProblem = null;
                        selectedSolution = null;
                    }, 1000);
                }
            }
        }

        function updateStatus(message, isSuccess = null) {
            const statusBox = document.getElementById('game-status');
            statusBox.innerHTML = message;
            
            if (isSuccess === true) {
                statusBox.className = "mb-8 p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-center text-emerald-900 font-bold";
            } else if (isSuccess === false) {
                statusBox.className = "mb-8 p-4 rounded-xl bg-rose-100 border border-rose-300 text-center text-rose-900 font-medium";
            } else {
                statusBox.className = "mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-center text-slate-800 font-medium";
            }
        }

        function resetGame() {
            selectedProblem = null;
            selectedSolution = null;
            matchesCount = 0;

            const allItems = document.querySelectorAll('.matching-item');
            allItems.forEach(item => {
                item.classList.remove('selected', 'matched');
                const icon = item.querySelector('.status-icon');
                if (icon) icon.className = "fas fa-circle text-xs text-slate-300 status-icon";
            });

            updateStatus("<i class='fas fa-hand-pointer text-amber-500 mr-2'></i>Select a problem on the left to start matching.");
        }