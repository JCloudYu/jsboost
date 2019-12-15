/**
 *	Author: JCloudYu
 *	Create: 2019/12/12
**/
import assert from "assert";
import {PackEncapsulateExecutor as Pack} from "../encapsulate-executor.esm.js";



init_context('encapsulate-executor', ()=>{
	test_group( "Sync execution vs async execution", ()=>{
		const exec = Pack([
			function() {
				this.state.seq = [];
			},
			function() {
				this.state.seq.push(1);
			},
			function() {
				return new Promise((resolve)=>{
					this.state.seq.push(2);
					resolve();
				}).then(()=>{
					this.state.seq.push(3);
				});
			},
			async function() {
				this.state.seq.push(4);
			},
			function() {
				return new Promise((resolve)=>{
					this.state.seq.push(5);
					
					setTimeout(resolve, 0);
				})
				.then(()=>{
					this.state.seq.push(6)
				});
			},
			async function() {
				this.state.seq.push(7);
				await (new Promise((resolve)=>setTimeout(resolve, 0)));
				this.state.seq.push(8);
			},
			function() {
				return this.state.seq;
			}
		]);
		const GROUND_TRUTH_1 = [ 1, 2, 4, 5, 7, 3, 6, 8 ];
		const GROUND_TRUTH_2 = [ 1, 2, 3, 4, 5 ,6 ,7 ,8 ];
		
		unit_test( "sync invoke", async()=>{
			const seq = exec();
			await new Promise((resolve)=>setTimeout(resolve, 100));
			
			assert(GROUND_TRUTH_1.join(',') === seq.join(','));
		});
		
		unit_test( "async invoke", async()=>{
			const seq = await exec.async();
			await new Promise((resolve)=>setTimeout(resolve, 100));
			
			assert(GROUND_TRUTH_2.join(',') === seq.join(','));
		});
	});
	unit_test( "Independently parallel execution ", async()=>{
		const exec = Pack([
			function() {
				this.state.seq = [];
			},
			async function() {
				this.state.seq.push(1);
				await (new Promise((resolve)=>setTimeout(resolve, 100)));
				this.state.seq.push(2);
				await (new Promise((resolve)=>setTimeout(resolve, 100)));
				this.state.seq.push(3);
				await (new Promise((resolve)=>setTimeout(resolve, 100)));
				this.state.seq.push(4);
			},
			function() {
				return this.state.seq;
			}
		]);
		const GROUND_TRUTH = [ 1, 2, 3, 4 ];
	
		const p1 = exec.async();
		const p2 = exec.async();
		
		const results = await Promise.all([p1, p2]);
		assert(GROUND_TRUTH.join(',') === results[0].join(','));
		assert(GROUND_TRUTH.join(',') === results[1].join(','));
	});
});

