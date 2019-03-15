/**
 *	Author: JCloudYu
 *	Create: 2019/03/15
**/
import assert from "assert";
import {Version} from "../jsboost.mjs";


test_group( "semver functionality test", ()=>{
	test_group( "construction test", ()=>{
		unit_test( "new Version()", ()=>{
			const version = new Version();
			assert( version.major === 0 );
			assert( version.minor === 0 );
			assert( version.patch === 0 );
			assert( version.prerelease.length === 0 );
		});
		unit_test( 'new Version( "1.2.3-rc.alpha.1.test" )', ()=>{
			const version = new Version( "1.2.3-rc.alpha.1.test" );
			assert( version.major === 1 );
			assert( version.minor === 2 );
			assert( version.patch === 3 );
			
			const prerelease = version.prerelease;
			assert( prerelease.length === 4 );
			assert( prerelease[0] === "rc" );
			assert( prerelease[1] === "alpha" );
			assert( prerelease[2] === 1 );
			assert( prerelease[3] === "test" );
		});
		unit_test( 'Version.From( "1.2.3-rc.alpha.1.test" )', ()=>{
			const version = Version.From( "1.2.3-rc.alpha.1.test" );
			assert( version.major === 1 );
			assert( version.minor === 2 );
			assert( version.patch === 3 );
			
			const prerelease = version.prerelease;
			assert( prerelease.length === 4 );
			assert( prerelease[0] === "rc" );
			assert( prerelease[1] === "alpha" );
			assert( prerelease[2] === 1 );
			assert( prerelease[3] === "test" );
		});
	});
	test_group( "special construction test", ()=>{
		unit_test( 'new Version("1") is equal to new Version("1.0.0") ', ()=>{
			const version	= new Version( "1" );
			const version2	= new Version( "1.0.0" );
			assert( version.major === version2.major );
			assert( version.minor === version2.minor );
			assert( version.patch === version2.patch );
		});
		unit_test( 'new Version("1.1") is equal to new Version("1.1.0") ', ()=>{
			const version	= new Version( "1.1" );
			const version2	= new Version( "1.1.0" );
			assert( version.major === version2.major );
			assert( version.minor === version2.minor );
			assert( version.patch === version2.patch );
		});
		unit_test( 'new Version( "1-rc.alpha.1.test" )', ()=>{
			const version = new Version( "1-rc.alpha.1.test" );
			assert( version.major === 1 );
			assert( version.minor === 0 );
			assert( version.patch === 0 );
			
			const prerelease = version.prerelease;
			assert( prerelease.length === 4 );
			assert( prerelease[0] === "rc" );
			assert( prerelease[1] === "alpha" );
			assert( prerelease[2] === 1 );
			assert( prerelease[3] === "test" );
		});
		unit_test( 'new Version( "1.2-rc.alpha.1.test" )', ()=>{
			const version = new Version( "1.2-rc.alpha.1.test" );
			assert( version.major === 1 );
			assert( version.minor === 2 );
			assert( version.patch === 0 );
			
			const prerelease = version.prerelease;
			assert( prerelease.length === 4 );
			assert( prerelease[0] === "rc" );
			assert( prerelease[1] === "alpha" );
			assert( prerelease[2] === 1 );
			assert( prerelease[3] === "test" );
		});
	});
	test_group( "common invalid format test", ()=>{
		unit_test( 'Version.From( "01.11.1" )', ()=>{
			const version = Version.From( "01.11.1" );
			assert(version === null);
		});
		unit_test( 'Version.From( "1.11.1-alpha01.01.1" )', ()=>{
			const version = Version.From( "1.11.1-alpha01.01.1" );
			assert(version === null);
		});
		unit_test( 'Version.From( "1.11.1-" )', ()=>{
			const version = Version.From( "1.11.1-" );
			assert(version === null);
		});
		unit_test( 'Version.From( "-rc.alpha.1.test" )', ()=>{
			const version = Version.From( "-rc.alpha.1.test" );
			assert(version === null);
		});
	});
	test_group( "comparison between version objects", ()=>{
		test_group( "simple comparison", ()=>{
			unit_test( 'new Version("1.0.1") === new Version("1.0.1")', ()=>{
				const version1 = new Version( "1.0.1" );
				const version2 = new Version( "1.0.1" );
				assert(version1.compare(version2) === 0);
			});
			unit_test( 'new Version("1.0.1-1.0.1") === new Version("1.0.1-1.0.1")', ()=>{
				const version1 = new Version( "1.0.1-1.0.1" );
				const version2 = new Version( "1.0.1-1.0.1" );
				assert(version1.compare(version2) === 0);
			});
			unit_test( 'new Version("1.2.4") > new Version("1.2.3")', ()=>{
				const version1 = new Version( "1.2.4" );
				const version2 = new Version( "1.2.3" );
				assert(version1.compare(version2) > 0);
			});
			unit_test( 'new Version("1.3.3") > new Version("1.2.3")', ()=>{
				const version1 = new Version( "1.3.3" );
				const version2 = new Version( "1.2.3" );
				assert(version1.compare(version2) > 0);
			});
			unit_test( 'new Version("2.2.3") > new Version("1.2.3")', ()=>{
				const version1 = new Version( "2.2.3" );
				const version2 = new Version( "1.2.3" );
				assert(version1.compare(version2) > 0);
			});
			unit_test( 'new Version("2.2") > new Version("2.2.3")', ()=>{
				const version1 = new Version( "2.2" );
				const version2 = new Version( "2.2.3" );
				assert(version1.compare(version2) < 0);
			});
			unit_test( 'new Version("2") > new Version("2.2.3")', ()=>{
				const version1 = new Version( "2" );
				const version2 = new Version( "2.2.3" );
				assert(version1.compare(version2) < 0);
			});
			unit_test( 'new Version("2") > new Version("2.2")', ()=>{
				const version1 = new Version( "2" );
				const version2 = new Version( "2.2" );
				assert(version1.compare(version2) < 0);
			});
			unit_test( 'new Version("1.0.0") > new Version("1.0.0-1")', ()=>{
				const version1 = new Version( "1.0.0" );
				const version2 = new Version( "1.0.0-1" );
				assert(version1.compare(version2) > 0);
			});
			unit_test( 'new Version("1.0.0-2") > new Version("1.0.0-1")', ()=>{
				const version1 = new Version( "1.0.0-2" );
				const version2 = new Version( "1.0.0-1" );
				assert(version1.compare(version2) > 0);
			});
			unit_test( 'new Version("1.0.0-a") > new Version("1.0.0-1")', ()=>{
				const version1 = new Version( "1.0.0-a" );
				const version2 = new Version( "1.0.0-1" );
				assert(version1.compare(version2) > 0);
			});
			unit_test( 'new Version("1.0.0-2.1.3") > new Version("1.0.0-2.1")', ()=>{
				const version1 = new Version( "1.0.0-2.1.3" );
				const version2 = new Version( "1.0.0-2.1" );
				assert(version1.compare(version2) > 0);
			});
			unit_test( 'new Version("1.0.0-2.2") > new Version("1.0.0-2.1.3")', ()=>{
				const version1 = new Version( "1.0.0-2.2" );
				const version2 = new Version( "1.0.0-2.1.3" );
				assert(version1.compare(version2) > 0);
			});
			unit_test( 'new Version("1.0.0-2.alpha") > new Version("1.0.0-2.1.3")', ()=>{
				const version1 = new Version( "1.0.0-2.alpha" );
				const version2 = new Version( "1.0.0-2.1.3" );
				assert(version1.compare(version2) > 0);
			});
		});
		test_group( "validating 1.0.0 > 1.0.0-rc.1 > 1.0.0-beta.11 > 1.0.0-beta.2 > 1.0.0-beta > 1.0.0-alpha.beta > 1.0.0-alpha.1 > 1.0.0-alpha", ()=>{
			const versions = [
				new Version("1.0.0-alpha"),
				new Version("1.0.0-alpha.1"),
				new Version("1.0.0-alpha.beta"),
				new Version("1.0.0-beta"),
				new Version("1.0.0-beta.2"),
				new Version("1.0.0-beta.11"),
				new Version("1.0.0-rc.1"),
				new Version("1.0.0"),
			];
			
			for( let i=1; i<versions.length; i++ )
			for( let j=0; j<i; j++) {
				assert( versions[i].compare(versions[j]) > 0 );
			}
		});
	});
	test_group( "comparison between version object and version string", ()=>{
		test_group( "simple comparison", ()=>{
			unit_test( 'new Version("1.0.1") === "1.0.1"', ()=>{
				const version = new Version( "1.0.1" );
				assert(version.compare("1.0.1") === 0);
			});
			unit_test( 'new Version("1.0.1-1.0.1") === "1.0.1-1.0.1"', ()=>{
				const version = new Version( "1.0.1-1.0.1" );
				assert(version.compare("1.0.1-1.0.1") === 0);
			});
			unit_test( 'new Version("1.2.4") > "1.2.3"', ()=>{
				const version = new Version( "1.2.4" );
				assert(version.compare("1.2.3") > 0);
			});
			unit_test( 'new Version("1.3.3") > "1.2.3"', ()=>{
				const version = new Version( "1.3.3" );
				assert(version.compare("1.2.3") > 0);
			});
			unit_test( 'new Version("2.2.3") > "1.2.3"', ()=>{
				const version = new Version( "2.2.3" );
				assert(version.compare("1.2.3") > 0);
			});
			unit_test( 'new Version("2.2.3") < "2.2"', ()=>{
				const version = new Version( "2.2.3" );
				assert(version.compare("2.2") < 0);
			});
			unit_test( 'new Version("2.2.0") < "2.2"', ()=>{
				const version = new Version( "2.2.0" );
				assert(version.compare("2.2") < 0);
			});
			unit_test( 'new Version("2.2.3") < "2"', ()=>{
				const version = new Version( "2.2.3" );
				assert(version.compare("2") < 0);
			});
			unit_test( 'new Version("2.0.0") < "2"', ()=>{
				const version = new Version( "2.0.0" );
				assert(version.compare("2") < 0);
			});
			unit_test( 'new Version("1.0.0") > "1.0.0-1"', ()=>{
				const version1 = new Version( "1.0.0" );
				assert(version1.compare("1.0.0-1") > 0);
			});
			unit_test( 'new Version("1.0.0-2") > "1.0.0-1"', ()=>{
				const version1 = new Version( "1.0.0-2" );
				assert(version1.compare("1.0.0-1") > 0);
			});
			unit_test( 'new Version("1.0.0-a") > "1.0.0-1"', ()=>{
				const version1 = new Version( "1.0.0-a" );
				assert(version1.compare("1.0.0-1") > 0);
			});
			unit_test( 'new Version("1.0.0-2.1.3") > "1.0.0-2.1"', ()=>{
				const version1 = new Version( "1.0.0-2.1.3" );
				assert(version1.compare("1.0.0-2.1") > 0);
			});
			unit_test( 'new Version("1.0.0-2.2") > "1.0.0-2.1.3"', ()=>{
				const version1 = new Version( "1.0.0-2.2" );
				assert(version1.compare("1.0.0-2.1.3") > 0);
			});
			unit_test( 'new Version("1.0.0-2.alpha") > "1.0.0-2.1.3"', ()=>{
				const version1 = new Version( "1.0.0-2.alpha" );
				assert(version1.compare("1.0.0-2.1.3") > 0);
			});
		});
		test_group( "validating 1 > 1.2 > 1.2.3 > 1.2.3-rc.1 > 1.2.3-beta.11 > 1.2.3-beta.2 > 1.2.3-beta > 1.2.3-alpha.beta > 1.2.3-alpha.1 > 1.2.3-alpha", ()=>{
			const base_version = new Version("1.2.3-alpha");
			const versions = [
				"1.2.3-alpha.1",
				"1.2.3-alpha.beta",
				"1.2.3-beta",
				"1.2.3-beta.2",
				"1.2.3-beta.11",
				"1.2.3-rc.1",
				"1.2.3",
				"1.2",
				"1",
			];
			
			for( let i=0; i<versions.length; i++ ) {
				assert( base_version.compare(versions[i]) < 0 );
			}
		});
	});
});
